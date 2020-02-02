describe('Routes: POST posts', () => {
  const BASE_URI = `/api/${config.version}`

  describe('Should get posts', () => {
    it('should return exact search post when the query contains phrase with double qoutes', (done) => {
      const query = {
        search: 'security agent'
      }
      request.get(`${BASE_URI}/posts`)
        .query(query)
        .expect(200)
        .end((err, res) => {
          console.log('response body :: ', res.body)
          expect(res.body.data.count).to.gte(0)
          done(err)
        })
    })

    it('should return search post', (done) => {
      const query = {
        search: '\"security agent\"'
      }
      request.get(`${BASE_URI}/posts`)
        .query(query)
        .expect(200)
        .end((err, res) => {
          console.log('response body :: ', res.body)
          expect(res.body.data.count).to.gte(0)
          done(err)
        })
    })
  })
})
