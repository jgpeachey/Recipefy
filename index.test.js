const app = require('./src/index');
const request = require('supertest')

describe('POST Testing login ', () =>{
    test("This should be a valid login", async () =>{   
        const response = await request(app).post("/user/login").send({
            Email: "rith@gmail.com",
            Password: "Rith"
        })
        //console.log(response);
        expect(response.statusCode).toEqual(201)
        //console.log(response.statusCode)
        expect(response.body.error).toEqual("")
    })
    test("This should have an invalid email", async() =>{
        const response = await request(app).post("/user/login/").send({
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