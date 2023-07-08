import * as Controller from "../controllers/user.controller";

export async function createUser(
  req: { params: { id: any } },
  res: { json: (arg0: any) => void }
) {
  const user = req.params.id;
  const result = await Controller.createUser(user);
  res.json(result);
}

export async function getUser(
  req: { params: { id: any } },
  res: { json: (arg0: any) => void }
) {
  const user = req.params.id;
  const result = await Controller.getUserDashboard(user);
  res.json(result);
}
