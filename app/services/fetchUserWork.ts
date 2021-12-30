import ApiConfig from "config/api-config";
import { apiClient } from "services/client";
import { AxiosResponse } from "axios";

export type PortFolio = {
  _id: string;
  created_at: string;
  description: string;
  dimensions: string;
  medium: string;
  orignal_height: number;
  orignal_width: number;
  post_image: string;
  s3_upload: boolean;
  tags: string;
  title: string;
  updated_at: string;
  user_id: string;
  resized_image_path: string;
  resize_height: number;
  resize_width: number;
  price: string;
};

type Response = {
  data: PortFolio[];
  statusCode: string | number;
};

type Body = {
  page: number;
  page_size: number;
  user_id: number;
};
export function fetchUserWork(
  data: Body
): Promise<AxiosResponse<Response>> {
  return apiClient.get(ApiConfig.FETCH_WORKS, { params: data });
}
