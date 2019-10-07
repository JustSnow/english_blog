import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../../../app'
import userFactory from '../../../factories/user'

chai.use(chaiHttp)
const expect = chai.expect
chai.should()

describe('UsersController', () => {
  describe('GET /', () => {
    before((done) => {
      // TODO: find how to generate data before tests
      // const user1 = userFactory.build('user')
      done()
    })

    it('returns all users', (done) => {
      chai.request(app).get('/admin/users').end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
    })
  })
})
