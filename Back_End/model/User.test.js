jest.mock('./User');
const User = jest.requireActual('./User');

describe("User Model", () => {
    test("Should not be valid without an email", () => {
      const u = new User({ 
      firstName: "fitrstname", 
      lastName: "lastName",
      password: "password",
     });
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });

    test("Should not be valid without a password", () => {
      const u = new User({ 
        firstName: "fitrstname",
        lastName: "lastName",
        email: "email" });
      try {
        u.validate();
      } catch (err) {
        expect(err.name).toEqual("ValidationError");
      }
    });
});