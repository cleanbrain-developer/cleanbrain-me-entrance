export type ServiceStatus = "active" | "planned" | "maintenance";

export interface Service {
  id: string;
  name: string;
  description: string;
  url: string;
  status: ServiceStatus;
  category?: string;
  external?: boolean;
}
