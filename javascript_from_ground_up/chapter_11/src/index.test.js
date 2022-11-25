// Defining the timeout for the test
const timeout = process.env.SLOWMO ? 6000 : 4000;

// Go to the specified path and wait for the domcontent to load before running the tests
beforeAll(async () => {
  // const filePath = fs.realpathSync(path.resolve(__dirname, './index.html'));
  // await page.goto('file://' + filePath, {waitUntil: 'domcontentloaded'});
  await new Promise(function (resolve) {
    setTimeout(resolve, 1500);
  });
  await page.goto('http://localhost:9000/', {
    waitUntil: ['networkidle0', 'domcontentloaded'],
  });
});

describe('Event homework - Login form', () => {
  test(
    'Login page validation - should validate empty fields successfully',
    async () => {
      const hintsText = await page.evaluate(() => {
        let arr = [];

        try {
          document.querySelectorAll('.login-button')[0].click();
        } catch (error) {
          throw new Error(
            "Login button should have a class called 'login-button'"
          );
        }

        try {
          const hints = document.querySelectorAll('.hint');
          if (!hints.length) throw '';
          hints.forEach((element) => arr.push(element.textContent));
        } catch {
          throw new Error("Hint fields should have a class called 'hint'");
        }

        return arr;
      });

      expect(hintsText).toMatchObject(['Field required', 'Field required']);
    },
    timeout
  );

  test(
    'Should submit form successfully',
    async () => {
      // Gets page title
      const title = await page.title();

      const submitObj = await page.evaluate(async () => {
        return await new Promise((resolve) => {
          const inputs = document.querySelectorAll('input');
          inputs[0].value = 'example@mail.com';
          inputs[1].value = 'Test321321';

          document.querySelector('form').addEventListener('submit', (event) => {
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());
            resolve(data);
          });

          try {
            document.querySelectorAll('.login-button')[0].click();
          } catch {
            throw new Error(
              "Login button should have a class called 'login-button'"
            );
          }
        });
      });
      // Compares it with the intended behaviour

      expect(submitObj).toMatchObject({});
    },
    timeout
  );
});
