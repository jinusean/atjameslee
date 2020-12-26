import Database from '@/database/Database'

export default ({ app }, inject) => {
  inject('db', new Database())
}
