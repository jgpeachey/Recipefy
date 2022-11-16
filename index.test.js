const app = require('./src/index');
const request = require('supertest')
var authToken = '';
var userId = ''
describe('POST Testing login ', () =>{
    test("This should be a valid login", async () =>{   
        const response = await request(app).post("/user/login").send({
            Email: "test@test.com",
            Password: "123456"
        })
        authToken = response._body.auth.accessToken;
        userId = response._body.user.id;
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
describe("POST testing /searchUser", () => {
    test("This should return an array of length 1", async () => {
        const response = await request(app).post("/user/searchUsers?search=paulo&count=6&page=1").send({
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(200);
        expect(response.body.results.length).toEqual(1);
    })
    test("This should return an empty array", async () => {
        const response = await request(app).post("/user/searchUsers?search=avbsadgafgdaf&count=6&page=1").send({
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(200);
        expect(response.body.results.length).toEqual(0);
    })
    test("This should return an array of length 6", async () => {
        const response = await request(app).post("/user/searchUsers?search&count=6&page=1").send({
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(200);
        expect(response.body.results.length).toEqual(6);
    })
})
describe('POST testing /updateuser', () => {
    test("This should return Invalid email", async ()=> {
        
        const response = await request(app).post("/user/updateuser").send({
            Email : "randomtest@test.com"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409)
        expect(response.body.error).toEqual("Invalid email");
    })
    test("This should return Invalid Password", async () => {
        const response = await request(app).post("/user/updateuser").send({
            Email : "test@test.com",
            Password: "amfnalgha"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409)
        expect(response.body.error).toEqual("Invalid Password")
    })
    test("This should return a valid statusCode of 201", async () => {
        const response = await request(app).post("/user/updateuser").send({
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
describe("POST testing verification", () => {
    test("This should return a User DNE", async () => {
        const response = await request(app).post("/user/verify").send({
            userId:"63729fc72304b9f55f466529",
            emailToken: "a0105f935e57562b15a6e5edcac5adb414f1f394173b371065b802eb240c9705"
        })
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("user DNE");
    })
    test("This should return user already verified", async () =>{
        const response = await request(app).post("/user/verify").send({
            userId:"636beb7b8f8b58d6a8df3726",
            emailToken: "a0105f935e57562b15a6e5edcac5adb414f1f394173b371065b802eb240c9705"
        })
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("user already verified");
    })
})

describe(" POST testing /resetPassword", () => {
    test("This should return a an invalid userId", async () => {
        const response = await request(app).post("/user/resetPassword").send({
            userId: userId,
            token: "a0105f935e57562b15a6e5edcac5adb414f1f394173b371065b802eb240c9705"
        })
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("Invalid userId");
    })
})

// testing recipe endpoints

describe("Post testing /addRecipe", () => {
    // make use of authToken
    test("This should return a response of 201 recipe created", async () => {
        const response = await request(app).post("/recipe/addRecipe").send({
            Title: "testRecipe",
            Description: "testDescription",
            Ingredients: ["testIngredient"],
            Instructions: ["testStep"],
            Description: "testing 123",
            Calories: "420",
            Sodium: "420",
            Pic: ""
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(response.body.message).toEqual("recipe created");
    })
    test("This should return a response of 401 access forbidden", async () => {
        const response = await request(app).post("/recipe/addRecipe").send({
            Title: "testRecipe",
            Description: "testDescription",
            Ingredients: ["testIngredient"],
            Instructions: ["testStep"],
            Description: "testing 123",
            Calories: "420",
            Sodium: "420",
            Pic: ""
        }).set({authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI8IkpXVCJ9.eyJ1c2VySWQiOiI2MzZiZWI3YjhmOGI1OGQ2YThkZjM3MjYiLCJpYXQiOjE2Njg2MjM1MjEsImV4cCI6MTY2ODY0NTEyMX0.JpqxwggVEZsdkLKrTBJOSz3h-L_G-e3f29l3DZ-AcaA"})
        expect(response.statusCode).toEqual(403);        
    })
})

// testing updaterecipe
describe("Post testing /updaterecipe", () => {
    test("This should return a response of 201 recipe updated", async () => {
        const response = await request(app).post("/recipe/updaterecipe").send({
            _id: "637531f79a2edf0e480305dd",
            Info: {
                Description: "noDescription",
                Ingredients: ["none"],
                Instructions: ["none"],
            }
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("");
    })
    test("This should return a response of 409 Invalid recipe", async () => {
        const response = await request(app).post("/recipe/updaterecipe").send({
            _id: "637531f79a2edf0e481245dd",
            Info: {
                Description: "noDescription",
                Ingredients: ["none"],
                Instructions: ["none"],
            }
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("Invalid recipe");
    })
})


// test findRecipe endpoint
describe("Post testing /findRecipe", () => {
    test("This should return a response of 200", async () => {
        const response = await request(app).post("/recipe/findRecipe?search&count=6&page=1").set({authorization: authToken})
        expect(response.statusCode).toEqual(200);
        expect(response.body.results.length).toEqual(6)
    })
    test("This should return a response of 200 and an array of length 0", async () =>{
        const response = await request(app).post("/recipe/findRecipe?search=adgghsdgadgfagf&count=6&page=1").set({authorization: authToken})
        expect(response.statusCode).toEqual(200);
        expect(response.body.results.length).toEqual(0)
    })
})

// gets recipes from a specific user
describe("Post testing /getUserRecipes", () => {
    // searches own recipes
    test("This should return a response of 200", async () => { 
        const response = await request(app).post("/recipe/getUserRecipe?count=6&page=1").send({
            userId: userId
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(200);
        expect(response.body.results.length).toEqual(6)
    })
    test("This should return a response of 200 and an empty array", async () => {
        const response = await request(app).post("/recipe/getUserRecipe?search=alkgjdagnsadga&count=6&page=1").send({
            userId: "63729fc72304b9f55f466529"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(200);
        expect(response.body.results.length).toEqual(0)
    })
})