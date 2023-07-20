import Datastore from 'nedb';

const nedbHelper = new Datastore({ filename: 'users.db', autoload: true });

export default nedbHelper;