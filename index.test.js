const app = require('./src/index');
const request = require('supertest')
var authToken = '';
describe('POST Testing login ', () =>{
    test("This should be a valid login", async () =>{   
        const response = await request(app).post("/user/login").send({
            Email: "test@test.com",
            Password: "123456"
        })
        authToken = response._body.auth.accessToken;
        expect(response.statusCode).toEqual(201)
        //console.log(response.statusCode)
        expect(response.body.error).toEqual("")
    })
    test("This should have an invalid email", async() =>{
        const response = await request(app).post("/user/login").send({
            Email: "robert@gmail.com",
            Password: "1234153"
        })
        expect(response.statusCode).toEqual(409)
        expect(response.body.error).toEqual("Invalid Email");
    })
    test("this should return invalid password", async () => {
        const response = await request(app).post("/user/login").send({
            Email: "rith@gmail.com",
            Password: "12345"
        })
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("Invalid Password");
    })
})
describe('POST Testing registration', () => {
    test("This should return Username Exists", async () => {
        const response = await request(app).post("/user/register").send({
            Firstname: "afedasfaf",
            Lastname: "adfafdasfas",
            Username: "afdafafaf",
            Email: "hello@gmail.com",
            Pic: "",
            Password: "12345"
        })
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("Username Exists");
    })
    test("This should return Email Exists", async () => {
        const response = await request(app).post("/user/register").send({
            Firstname: "Barack",
            Lastname: "Obama",
            Username: "obama",
            Email: "rith@gmail.com",
            Pic: "",
            Password: "12345"
        })
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("Email Exists");
    })
})
describe('PUT testing /updateuser', () => {
    test("This should return Invalid email", async ()=> {
        
        const response = await request(app).put("/user/updateuser").send({
            Email : "randomtest@test.com"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409)
        expect(response.body.error).toEqual("Invalid email");
    })
    test("This should return Invalid Password", async () => {
        const response = await request(app).put("/user/updateuser").send({
            Email : "test@test.com",
            Password: "amfnalgha"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409)
        expect(response.body.error).toEqual("Invalid Password")
    })
    test("This should return a valid statusCode of 201", async () => {
        const response = await request(app).put("/user/updateuser").send({
            Email : "test@test.com",
            Password: "123456",
            Info: {
                Username: "testing12345",
                Firstname: "tester"
            }
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201)
    })
})