import * as bcrypt from 'bcrypt';

export const CreateSaltHash = async (password: string) => {
  const saltOrRounds = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

export const compareHash = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
