const request = require("supertest");
const baseURL = "http://localhost:5000";

describe("/api/login", () => {
    const newLogin = {
        login:"jesttest1",
        email:"jest@gmail.com",
        password:"jesttest"
    }
    const wrongLogin = {
        login:"jesttest1",
        password:"WRONG"
    }
    const loginDelete = {
        login:"jesttest1",
        password:"jesttest"
    }
    beforeAll(async () => {
        await request(baseURL).post("/api/register").send(newLogin);
    })
    afterAll(async () => {
        await request(baseURL).post("/api/deleteAccount").send(loginDelete);
    })
    it("should return 200 and login information", async () => {
        const response = await request(baseURL).post('/api/login').send(newLogin);
        const lastItem = response.body;
        expect(response.statusCode).toBe(200);
        expect(lastItem.login).toBe(newLogin.login);
        expect(lastItem.email).toBe(newLogin.email);
        expect(lastItem.error).toBe("");
    });
    it("should return error", async () => {
        const response = await request(baseURL).post('/api/login').send(wrongLogin);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("User not found");
    })
});

describe("/api/register", () => {
    const newLogin = {
        login:"jesttest2",
        email:"jest@gmail.com",
        password:"jesttest"
    }
    const dupeEmail = {
        login:"jesttest3",
        email:"jest@gmail.com",
        password:"jesttest"
    }
    const loginDelete = {
        login:"jesttest2",
        password:"jesttest"
    }
    afterAll(async () => {
        await request(baseURL).post("/api/deleteAccount").send(loginDelete);
    })
    it("should be able to register a new account", async () => {
        const response = await request(baseURL).post("/api/register").send(newLogin);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("");
    });
    it("should return error on duplicate login register", async () => {
        await request(baseURL).post("/api/register").send(newLogin);
        const response = await request(baseURL).post("/api/register").send(newLogin);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("Username belongs to another user");
    });
    it("should return error on duplicate email register", async () => {
        await request(baseURL).post("/api/register").send(newLogin);
        const response = await request(baseURL).post("/api/register").send(dupeEmail);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("Email is already in use");
        await request(baseURL).post("/api/deleteAccount").send(dupeEmail);
    });
});

describe("/api/retrieveUserInfo", () => {
    const user1 = {
        login:"jesttest4",
        email:"jesttest4@gmail.com",
        password:"password"
    }
    it("should return user info", async() => {
        let registerResponse = await request(baseURL).post("/api/register").send(user1);
        let regid = registerResponse.body.id
        const reqbody = {
            userid:regid
        }
        const response = await request(baseURL).post("/api/retrieveUserInfo").send(reqbody);
        expect(response.statusCode).toBe(200);
        expect(response.body.result).not.toBe(null);
        expect(response.body.result._id).not.toBe(null);
        expect(response.body.result._id).toBe(regid);
        expect(response.body.error).toBe("");
        await request(baseURL).post("/api/deleteAccount").send(user1);
    });
    it("should return error on non-extistent user", async() => {
        const response = await request(baseURL).post("/api/retrieveUserInfo").send(0);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("User not found");
    });
});

describe("/api/deleteItem", () => {
    const item = {
        sellerid:"aaa",
    }
    it("should delete item given correct information", async() => {
        const createResponse = await request(baseURL).post("/api/createItem").send(item);
        const deletereq = {
            sellerid:"aaa",
            itemid:createResponse.body.itemid
        }
        const response = await request(baseURL).post("/api/deleteItem").send(deletereq);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("");
    });
    it("should return an error for a nonextistent item", async() => {
        const response = await request(baseURL).post("/api/deleteItem").send(0);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("Item was not found");
    });
});

describe("/api/retrieveItemInfo", () => {
    const item = {
        sellerid:"abc"
    };
    it("should retrieve the item's info", async () => {
        const createResponse = await request(baseURL).post("/api/createItem").send(item);
        
        const retrieveRequest = {
            itemid:createResponse.body.itemid,
            sellerid:"abc"
        };

        const response = await request(baseURL).post("/api/retrieveItemInfo").send(retrieveRequest);

        expect(response.statusCode).toBe(200);
        expect(response.body.result.sellerid).toBe("abc");

        await request(baseURL).post("/api/deleteItem").send(retrieveRequest);
    });
    it("should return an error for non-existent item", async () => {
        const response = await request(baseURL).post("/api/retrieveItemInfo").send(0);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("Item was not found");
    });
});

describe("/api/deleteAccount", () => {
    const account = {
        login:"jesttest100",
        password:"123",
        email:"jesttest100@gmail.com"
    }
    it("should delete account given correct information", async() => {
        await request(baseURL).post("/api/register").send(account);
        const response = await request(baseURL).post("/api/deleteAccount").send(account);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("");
    });
    it("should return an error for a nonextistent item", async() => {
        const response = await request(baseURL).post("/api/deleteAccount").send(0);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("Account deletion failed\n");
    });
});

describe("/api/createItem", () => {
    const item = {
        sellerid:"bababooey"
    }
    it("creates an item", async () => {
        const response = await request(baseURL).post("/api/createItem").send(item);
        const getRequest = {
            itemid:response.body.itemid
        }
        const retrieveResponse = await request(baseURL).post("/api/retrieveItemInfo").send(getRequest);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("");
        expect(response.body.itemid).not.toBe(null);
        expect(retrieveResponse.body.result.sellerid).toBe(item.sellerid);
    });
});

describe("/api/verify/:id", () => {
    const account = {
        login:"a",
        email:"bcd",
        password:"pass"
    }
    it("should verify an email given a valid id", async() => {
        const createResponse = await request(baseURL).post("/api/register").send(account);

        const getResponse = {
            userid:createResponse.body.id
        }

        const verifyRequest = "/api/verify/" + createResponse.body.id;
        const verifyResponse = await request(baseURL).post(verifyRequest).send();
        const userInfoResponse = await request(baseURL).post("/api/retrieveUserInfo").send(getResponse);

        expect(verifyResponse.statusCode).toBe(200);
        expect(verifyResponse.body.error).toBe("");
        expect(userInfoResponse.body.result.verified).toBe(true);

        await request(baseURL).post("/api/deleteAccount").send(account);
    });
    it("should return an error given an invalid id", async() => {
        const verifyResponse = await request(baseURL).post("/api/verify/aaaaaaaaaaaaaaaaaaaaaaaa").send();
        expect(verifyResponse.statusCode).toBe(200);
        expect(verifyResponse.body.error).toBe("User could not be found");
    });
});

describe("/api/getIDFromEmail", () => {
    const account = {
        login:"jesttest987",
        email:"email",
        password:"pass"
    };
    const fakeemail = {
        email:"abc"
    }
    it("API should return ID given email", async () => {
        await request(baseURL).post("/api/register").send(account);
        const response = await request(baseURL).post("/api/getIDFromEmail").send(account);
        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBe(account.email);
        expect(response.body.userid).not.toBe(null);
        expect(response.body.error).toBe("");
        await request(baseURL).post("/api/deleteAccount").send(account);
    });
    it("should return error given non-existent email", async () => {
        const response = await request(baseURL).post("/api/getIDFromEmail").send(fakeemail);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("Could not find email in database");
    });
});