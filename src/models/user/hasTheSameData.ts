import User from "./index";

const hasTheSameData = async (
  path: string,
  value: string
): Promise<boolean> => {
  const query: any = {};
  query[path] = value;
  try {
    const user = await User.findOne(query);
    if (user) return true;
    return false;
  } catch (error) {
    console.log(error);
    return true;
  }
};

export default hasTheSameData;
