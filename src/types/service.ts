export type ServiceStatus = "active" | "planned" | "maintenance";

export interface Service {
  id: string;
  name: string;
  /** Default description, shown when no locale-specific text is available. */
  description: string;
  /** English description; falls back to `description` when omitted. */
  descriptionEn?: string;
  url: string;
  status: ServiceStatus;
  category?: string;
  external?: boolean;
}
