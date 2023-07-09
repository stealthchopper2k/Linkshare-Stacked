import * as Controller from "../controllers/user.controller";
import { Request, Response } from "express";

export async function postUser(req: Request, res: Response) {
  const id = req.params.id;
  const dashboard = req.body;

  const response = await Controller.createUser(id, dashboard);

  if ("error" in response) {
    res.send(JSON.stringify(response.error));
  }

  res.json(response);
}

export async function getUser(
  req: { params: { id: any } },
  res: { json: (arg0: any) => void }
) {
  try {
    const user = req.params.id;
    const result = await Controller.getUserDashboard(user);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
}
