import mg from 'mongoose';

const credentialsSchema = new mg.Schema({
  name: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  expiry: { type: Date, required: true },
});
credentialsSchema.index({ name: 1 });
const Credentials = mg.model('Credentials', credentialsSchema);

export default Credentials;

export const createCredential = (values: Record<string, any>) =>
  new Credentials(values).save().then((credential) => credential.toObject());
export const updateCredential = (
  by: Record<string, any>,
  values: Record<string, any>
) => Credentials.updateOne(by, values);
export const getCredential = (qry: Record<string, any>) =>
  Credentials.findOne(qry).then((credential) => credential.toObject());
