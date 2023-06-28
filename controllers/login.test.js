/* eslint-disable no-undef */
const {login} = require("../controllers/users");

describe("test login controller", () => {
  test("return status 200", () => {
  
})})




// const { mockRequest, mockResponse } = require("jest-mock-req-res");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { HttpError } = require("../helpers");

// const { User } = require("../models/users.js");

// jest.mock("bcrypt");
// jest.mock("jsonwebtoken");
// jest.mock("../models/users");

// describe("login function", () => {
//   let req;
//   let res;

//   beforeEach(() => {
//     req = mockRequest({
//       body: {
//         email: "test@example.com",
//         password: "password123",
//       },
//     });
//     res = mockResponse();
//   });

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it("should throw an error if user is not found", async () => {
//     User.findOne.mockResolvedValueOnce(null);

//     await expect(login(req, res)).rejects.toThrow(HttpError(400));

//     expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
//     expect(res.status).not.toHaveBeenCalled();
//     expect(res.json).not.toHaveBeenCalled();
//   });

//   it("should throw an error if password is incorrect", async () => {
//     const mockUser = { _id: "12345", password: "hashedPassword" };
//     User.findOne.mockResolvedValueOnce(mockUser);
//     bcrypt.compare.mockResolvedValueOnce(false);

//     await expect(login(req, res)).rejects.toThrow(HttpError(401));

//     expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
//     expect(bcrypt.compare).toHaveBeenCalledWith(
//       "password123",
//       "hashedPassword"
//     );
//     expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
//     expect(jwt.sign).not.toHaveBeenCalled();
//     expect(res.status).not.toHaveBeenCalled();
//     expect(res.json).not.toHaveBeenCalled();
//   });

//   it("should generate a token and update the user document on successful login", async () => {
//     const mockUser = { _id: "12345", password: "hashedPassword" };
//     User.findOne.mockResolvedValueOnce(mockUser);
//     bcrypt.compare.mockResolvedValueOnce(true);
//     jwt.sign.mockReturnValueOnce("mockToken");

//     await login(req, res);

//     expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
//     expect(bcrypt.compare).toHaveBeenCalledWith(
//       "password123",
//       "hashedPassword"
//     );
//     expect(User.findByIdAndUpdate).toHaveBeenCalledWith("12345", {
//       token: "mockToken",
//     });
//     expect(jwt.sign).toHaveBeenCalledWith({ id: "12345" }, "secretKey", {
//       expiresIn: "23h",
//     });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ token: "mockToken" });
//   });
// });
