# Store front api

Create an image processing API that resizes and saves images to user specifications

## Description

Create an image processing API that resizes and saves images to user specifications when visiting a URL

### Installing

- You cane download my project.

```
git clone https://github.com/aml-fakhry/first_project-fwd_web_advanced.git
```

- project requires having node installed https://nodejs.org/en/download/

### Executing program (scripts)

- Install all dependencies

```
yarn
```

- Run the program in development environment.

```
yarn dev
```

- Run compiled code (build).

```
yarn start:build
```

- Run test program.

```
yarn test
```

- Lint script.

```
yarn lint
```

- Format script.

```
yarn format
```

## Functionality

1- Resize image

- resizeImage() method to resize images.
- @param filename the file name to be processed.
- @param width the width of image.
- @param height the height of image.
- @returns promise of data result.

```
(method) resizeImage(filename: string, width: number, height: number): Promise<DataResult>
```

## Unit tests.

1- Check if image exist in full or thumb folders.

```javascript
describe('Check if image exist in full or thumb folders.', () => {
  it('Pass when image exist in full folder.', () => {
    const result = fs.existsSync(fullPic1Path);
    expect(result).toBeTruthy();
  });

  it('Pass when image not exist in full folder.', () => {
    const result = fs.existsSync(thumbPic1Path);
    expect(result).not.toBeTruthy();
  });
});
```

2- Check if returned data from resizeImage().

```javascript
describe('Check if returned data from resizeImage().', () => {
  it('Pass returned data from resizeImage().', async () => {
    const result = await imageProcessDataAccess.resizeImage('pic1', 300, 300);

    expect(result.data).toBeTruthy();
    expect(result.data.format).toBe('jpeg');
    expect(result.data.width).toBe(300);
    expect(result.data.width).toBe(300);
    expect(result.validationErrors).toBeUndefined();
    expect(result.isNotFound).toBeFalsy();
  });
});
```

2- Test image processing API.

```javascript
const request = supertest(app);
describe('Test image processing API', () => {
  it('Pass when response status equal 200', async () => {
    const response = await request.get('/api/images?filename=pic2&width=300&height=300');
    expect(response.status).toBe(200);
  });

  it('Pass when it fails because it is already processed.', async () => {
    const response = await request.get('/api/images?filename=pic2&width=300&height=300');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Ooh, this image processed before please use a new one.');
  });
});
```

## Endpoints

-[ Here My work space in postman contain store front collection] [![Run in Postman](https://run.pstmn.io/button.svg)](https://lunar-zodiac-696136.postman.co/workspace/My-Workspace~f39f8c95-ce31-4043-8a02-9e8b06cea226/collection/10248046-39b56467-ae7b-4485-ad8a-bcc6a5bb3e17?ctx=documentation)

## License

This project is licensed under the Aml Fakhri License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.

- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [lint-staged](https://www.npmjs.com/package/lint-staged)
- [sharp](https://www.npmjs.com/package/sharp)
- [jasmine](https://jasmine.github.io/)
- [pg](https://www.npmjs.com/package/pg)
- [supertest](https://www.npmjs.com/package/supertest)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [db-migrate](https://www.npmjs.com/package/db-migrate)
- [tsc-watch](https://www.npmjs.com/package/tsc-watch)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## Project structure.

```

.
📦src
┣ 📂data
┃ ┣ 📂category
┃ ┃ ┣ 📂data
┃ ┃ ┃ ┣ 📜category.data.ts
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂model
┃ ┃ ┃ ┣ 📜category.dto.ts
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂order
┃ ┃ ┣ 📂data
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┗ 📜order.data.ts
┃ ┃ ┣ 📂model
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┗ 📜order.model.ts
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂product
┃ ┃ ┣ 📂data
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┗ 📜product.data.ts
┃ ┃ ┣ 📂model
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┗ 📜product.dto.ts
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂user
┃ ┃ ┣ 📂data
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┗ 📜user.data.ts
┃ ┃ ┣ 📂model
┃ ┃ ┃ ┣ 📜access-token.dto.ts
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┗ 📜user.dto.ts
┃ ┃ ┗ 📜index.ts
┃ ┗ 📜index.ts
┣ 📂database
┃ ┣ 📂tables
┃ ┃ ┣ 📜access_token.schema.sql
┃ ┃ ┣ 📜category.table.sql
┃ ┃ ┣ 📜order.schema.sql
┃ ┃ ┣ 📜product.schema.sql
┃ ┃ ┗ 📜user.schema.sql
┃ ┗ 📜database.helper.ts
┣ 📂routes
┃ ┣ 📂api
┃ ┃ ┣ 📜category.routes.ts
┃ ┃ ┣ 📜index.ts
┃ ┃ ┣ 📜order.routes.ts
┃ ┃ ┣ 📜product.routes.ts
┃ ┃ ┗ 📜user.routes.ts
┃ ┗ 📜index.ts
┣ 📂server
┃ ┣ 📜index.ts
┃ ┗ 📜server.ts
┣ 📂shared
┃ ┣ 📂middleware
┃ ┃ ┣ 📜auth.middleware.ts
┃ ┃ ┣ 📜error-handler.middleware.ts
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂model
┃ ┃ ┣ 📜app-error-code.model.ts
┃ ┃ ┣ 📜app-error-model.ts
┃ ┃ ┣ 📜app-http-response-error.model.ts
┃ ┃ ┣ 📜app-http-response.model.ts
┃ ┃ ┣ 📜data-result.model.ts
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂utils
┃ ┃ ┣ 📜hash.util.ts
┃ ┃ ┣ 📜http-response.util.ts
┃ ┃ ┣ 📜index.ts
┃ ┃ ┣ 📜jsonwebtoken.util.ts
┃ ┃ ┗ 📜logger.util.ts
┃ ┗ 📜index.ts
┣ 📂tests
┃ ┣ 📂helpers
┃ ┃ ┗ 📜reporter.ts
┃ ┣ 📜app.spec.ts
┃ ┗ 📜test.spec.ts
┣ 📂typings
┃ ┗ 📂global
┃ ┃ ┗ 📜index.d.ts
┗ 📜app.ts

```

## Authors

Contributors names and contact info

ex. Aml fakhri
ex. [@aml_fakhri](amlfakhry13@gmail.com)

```

```
