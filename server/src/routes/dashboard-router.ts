import * as Model from "../Models/dashboard.model";
import { Request, Response } from "express";
import { UserDashboard } from "../utils/interface/dashboard";
import { raise } from "../utils/helper";

export async function postSettings(req: Request, res: Response) {
  const id: any = req.params.id;
  const settings = req.body;

  if (!id || !settings)
    raise(id, "User ID is required to update user settings");
  try {
    const result = await Model.updateSettings(id, settings);
    res.status(200).json(result);
  } catch (e) {
    if (e instanceof Error) res.status(500).json({ error: e.message });
  }
}

export async function getDashboard(req: Request, res: Response) {
  const id: any = req.params.id;

  if (!id) raise(id, "User ID is required to return dashboard");

  try {
    const dashboard = await Model.getUserDashboard(id);
    res.status(200).json(dashboard);
  } catch (e) {
    if (e instanceof Error) res.status(500).json({ error: e.message });
  }
}

export async function postDashboard(req: Request, res: Response) {
  const id: any = req.params.id;
  const dashboard = req.body;

  if (!id || !dashboard)
    raise(id || dashboard, "User ID is required to return dashboard");
  try {
    const updateResponse = await Model.updateDashboard(id, req.body);
    res.status(200).json(updateResponse);
  } catch (e) {
    if (e instanceof Error) res.status(500).json({ error: e.message });
  }
}
