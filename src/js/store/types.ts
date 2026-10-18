export type AvailabilityState = "available" | "unavailable";

export interface Availability {
  state: AvailabilityState;
  note: string;
}

export interface Project {
  id: string;
  title: string;
  kind: string;
  description: string;
  stack: string;
  link: string;
  linkLabel: string;
  hidden: boolean;
}

export interface ProjectDraft extends Omit<Project, "id" | "hidden"> {
  id?: string;
}

export interface ProjectUpdate extends Partial<Project> {
  id: string;
}

export type MessageType = "enquiry" | "feedback";

export interface Message {
  id: string;
  at: string;
  read: boolean;
  archived: boolean;
  type: MessageType;
  name: string;
  email: string;
  subject: string;
  body: string;
  detail: string;
}

export interface MessageDraft
  extends Omit<Message, "id" | "at" | "read" | "archived"> {}

export interface PortfolioState {
  availability: Availability;
  projects: Project[];
  inbox: Message[];
}

export type MessageFilter = "all" | "enquiry" | "feedback" | "archived";
