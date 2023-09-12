/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *      userName:
 *        type: string
 *        description: The user name
 *      firstName:
 *        type: string
 *        description: The user first name
 *      lastName:
 *        type: string
 *        description: The user last name
 *      email:
 *        type: string
 *        description: The user email
 *      password:
 *        type: string
 *        description: The user password
 *      role:
 *        type: string
 *        description: The user role
 *        enum:
 *          - admin
 *          - basic
 *   Product:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: The product name
 *       description:
 *         type: string
 *         description: The product description
 *       price:
 *         type: string
 *         description: The product price
 *       image:
 *         type: string
 *         description: The product image
 *       categoryId:
 *         type: string
 *         description: The product id category
 *    Customer:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *          description: The customer firstName
 *        lastName:
 *          type: string
 *          description: The customer lastName
 *        address:
 *          type: string
 *          description: The customer address
 *        phone:
 *          type: string
 *          description: The customer phone
 *        userId:
 *          type: string
 *          description: The customer userId
 */

/**
 * @swagger
 * tags:
 *  - name: Users
 *    description: API to manage users
 *  - name: Products
 *    description: API to manage products
 *  - name: Customers
 *    description: API to manage customer
 */

/** .............USER............... */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              userName: Joi12
 *              firstName: Joi
 *              lastName: Donel
 *              email: joi12@gmail.com
 *              password: 3445667
 *              role: admin
 *      400:
 *        description: Bad Request
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get list user
 *    tags: [Users]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            type: array
 *            example:
 *              - id: 1
 *                userName: Joi12
 *                firstName: Joi
 *                lastName: Donel
 *                email: joi12@gmail.com
 *                password: 3445667
 *                role: admin
 *      500:
 *        description: Internet server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: get a user
 *    tags: [Users]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: User Id
 *        schema:
 *          type: integer
 *        example: 1
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              id: 1
 *              userName: Joi12
 *              firstName: Joi
 *              lastName: Donel
 *              email: joi12@gmail.com
 *              password: 3445667
 *              role: admin
 *      400:
 *        description: Bad request
 *      500:
 *        descriptuion: internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: Update an existing user
 *      tags: [Users]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: User ID to update
 *          schema:
 *            type: integer
 *          example:
 *            1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        204:
 *          description: User updated successfully
 *        400:
 *          description: Bad request
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: delete an existing user
 *      tags: [Users]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: User ID to delete
 *          schema:
 *            type: integer
 *          example:
 *            1
 *      responses:
 *        204:
 *          description: User deleted successfully
 *        400:
 *          description: Bad request
 *        500:
 *          description: Internal server error
 */

/** .............CUSTOMER............... */

/**
 * @swagger
 * /api/customers:
 *  post:
 *    summary: create a new customer
 *    tags: [Customers]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Customer'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              firstName: Gonzalo
 *              lastName: Juárez
 *              address: Calle #1
 *              phone: 445566443322
 *              user:
 *                userName: Gon1
 *                email: gon1@email.com
 *      400:
 *        description: Bad Request
 */

/**
 * @swagger
 * /api/customers:
 *  get:
 *    summary: Get list customer
 *    tags: [Customers]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            type: array
 *            example:
 *              - id: 1
 *                firstName: Joi
 *                lastName: Donel
 *                address: Calle #1
 *                phone: 445566776655
 *                user:
 *                  email: joi12@gmail.com
 *                  userName: joi13
 *      500:
 *        description: Internet server error
 */

/**
 * @swagger
 * /api/customer/{id}:
 *  get:
 *    summary: get a customer
 *    tags: [Customers]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Customer Id
 *        schema:
 *          type: integer
 *        example: 1
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              id: 1
 *              firstName: Joi
 *              lastName: Donel
 *              address: Calle #2
 *              phone: 445566778899
 *              user:
 *                email: joi12@gmail.com
 *                userName: joi12
 *      400:
 *        description: Bad request
 *      500:
 *        descriptuion: internal server error
 */

/**
 * @swagger
 * /api/customers/{id}:
 *  put:
 *      summary: Update an existing customer
 *      tags: [Customers]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Customer ID to update
 *          schema:
 *            type: integer
 *          example:
 *            1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Customer'
 *      responses:
 *        204:
 *          description: Customer updated successfully
 *        400:
 *          description: Bad request
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /api/customers/{id}:
 *  delete:
 *      summary: delete an existing customer
 *      tags: [Customers]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Customer ID to delete
 *          schema:
 *            type: integer
 *          example:
 *            1
 *      responses:
 *        204:
 *          description: Customer deleted successfully
 *        400:
 *          description: Bad request
 *        500:
 *          description: Internal server error
 */

/** .............PRODUCT............... */

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: create a new product
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              name: Product 1
 *              description: Product description 1
 *              price: 120.20
 *              categoryId: 1
 *              image: https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp
 *      400:
 *        description: Bad Request
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get list product
 *    tags: [Products]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            type: array
 *            example:
 *              - id: 1
 *                name: Product 1
 *                description: Product description 1
 *                price: 120.20
 *                categoryId: 1
 *                image: https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp
 *      500:
 *        description: Internet server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: get a product
 *    tags: [Products]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Product Id
 *        schema:
 *          type: integer
 *        example: 1
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              id: 1
 *              name: product 1
 *              description: product description 1
 *              price: 120.20
 *              category:
 *                id: 1
 *                name: category 1
 *                image: https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp
 *      400:
 *        description: Bad request
 *      500:
 *        descriptuion: internal server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update an existing product
 *      tags: [Products]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Product ID to update
 *          schema:
 *            type: integer
 *          example:
 *            1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Product'
 *      responses:
 *        204:
 *          description: Product updated successfully
 *        400:
 *          description: Bad request
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: delete an existing product
 *      tags: [Products]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Product ID to delete
 *          schema:
 *            type: integer
 *          example:
 *            1
 *      responses:
 *        204:
 *          description: Product deleted successfully
 *        400:
 *          description: Bad request
 *        500:
 *          description: Internal server error
 */

/**
 * securitySchemes:
    JWTAuth:
    type: http
    scheme: bearer
 */
