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
    test("This should return an array of length 0", async () => {
        const response = await request(app).post("/user/searchUsers?search=paulo&count=6&page=1").send({
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(200);
        expect(response.body.results.length).toEqual(0);
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
            userId:"637eacd23fa05758cc19cc2e",
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
            _id: "63811ee0ce011dad457478f5",
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

// looks among all recipes
describe("Post testing /findAllRecipe", () => {
    test("This should return a response of 200 and an array of size 6", async () => { 
        const response = await request(app).post("/recipe/findAllRecipe?search&count=6&page=2").set({authorization: authToken})
        expect(response.statusCode).toEqual(200);
        expect(response.body.results.length).toEqual(6)
    })
    test("This should return a response of 200 and an array of size 0", async () => { 
        const response = await request(app).post("/recipe/findAllRecipe?search=haklghqwerwfs=&count=6&page=2").set({authorization: authToken})
        expect(response.statusCode).toEqual(200);
        expect(response.body.results.length).toEqual(0)
    })
})

// returns a list of liked recipes

describe("Post testing /getLikedRecipes", () => {
    test("This should return a response of 201 and an array", async () => { 
        const response = await request(app).post("/recipe/getLikedRecipes").set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(typeof response.body.results).toEqual('object') // an array is an object
    })
    test("This should return a response of 403 an error", async () => {
        const response = await request(app).post("/recipe/getLikedRecipes").set({authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2c4VySWQiOiI2MzZiZWI3YjhmOGI1OGQ2YThkZjM3MjYiLCJpYXQiOjE2Njg2MjM1MjEsImV4cCI6MTY2ODY0NTEyMX0.JpqxwggVEZsdkLKrTBJOSz3h-L_G-e3f29l3DZ-AcaA"})
        expect(response.statusCode).toEqual(403);
    })
})

// testing likerecipe endpoint
describe("POST testing /likerecipe", () => {
    test("This should return a response of 201 and an empty error", async () => {
        const response = await request(app).post("/recipe/likerecipe").send({
            recipeId: "637eae81e05322011a8d3d5a"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("");
    })
    test("This should return a response of 201 and that the user already liked the recipe", async () => {
        const response = await request(app).post("/recipe/likerecipe").send({
            recipeId: "637eae81e05322011a8d3d5a"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("Already Liked");
    })
    test("This should return a response of 201 and that the Recipe DNE", async () => {
        const response = await request(app).post("/recipe/likerecipe").send({
            recipeId: "636fcc87dddd3d921c73669f"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("Recipe DNE");
    })
})

describe("POST testing /unlikeRecipe", () => {
    test("This should return a response of 201 and an empty error", async () => {
        const response = await request(app).post("/recipe/unlikeRecipe").send({
            recipeId: "637eae81e05322011a8d3d5a"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("");
    })
    test("This should return a response of 201 and that the user never liked the recipe", async () => {
        const response = await request(app).post("/recipe/unlikeRecipe").send({
            recipeId: "637eae81e05322011a8d3d5a"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("Recipe never liked");
    })
    test("This should return a response of 201 and that the Recipe DNE", async () => {
        const response = await request(app).post("/recipe/unlikeRecipe").send({
            recipeId: "636fcc87dddd3d921c73669f"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("Recipe DNE");
    })
})


describe("POST testing /followUser", () => {
    test("This should return a response of 201 and an empty error", async () => {
        const response = await request(app).post("/user/followUser").send({
            userId: "637eacd23fa05758cc19cc2e"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("");
    })
    test("This should return a response of 409 and that the user already followed the user", async () => {
        const response = await request(app).post("/user/followUser").send({
            userId: "637eacd23fa05758cc19cc2e"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("Already following");    
    })
    test("This should return a response of 409 and that the user DNE", async () => {
        const response = await request(app).post("/user/followUser").send({
            userId: "123beb7b8f8b58d6a8df3726"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("User DNE");
    }) 
    test("This should return a response of 409 and that cannot follow yourself", async () => {
        const response = await request(app).post("/user/followUser").send({
            userId: userId
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("Cannot follow yourself");
    })
})

describe("POST testing /unfollowUser", () => {
    test("This should return a response of 201 and an empty error", async () => {
        const response = await request(app).post("/user/unfollowUser").send({
            userId: "637eacd23fa05758cc19cc2e"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(201);
        expect(response.body.error).toEqual("");
    })
    test("This should return a response of 409 and Not following user already", async () => {
        const response = await request(app).post("/user/unfollowUser").send({
            userId: "637eacd23fa05758cc19cc2e"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("Not following user already");
    })
    test("This should return a response of 409 and that the user DNE", async () => {
        const response = await request(app).post("/user/unfollowUser").send({
            userId: "123beb7b8f8b58d6a8df3726"
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("User DNE");
    })
    test("This should return a response of 409 and that cannot unfollow yourself", async () => {
        const response = await request(app).post("/user/unfollowUser").send({
            userId: userId
        }).set({authorization: authToken})
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toEqual("Cannot unfollow yourself");
    })

})