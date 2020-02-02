const Status = require('http-status')
const { Router } = require('express')

module.exports = ({
  postServiceInjection,
  logger,
  response: { Success, Fail }
}) => {
  const router = Router()

  /**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a list of posts
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: An array of posts
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/user'
 *       401:
 *        $ref: '#/responses/Unauthorized'
 */
  router
    .get('/', (req, res) => {
      postServiceInjection
        .getPosts(req.query)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  
  return router
}
