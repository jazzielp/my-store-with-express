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
 */

/**
 * @swagger
 * tags:
 *  - name: User
 *    description: API to manage users
 */

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

/**
 * securitySchemes:
    JWTAuth:
    type: http
    scheme: bearer
 */
