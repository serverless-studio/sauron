export interface LogEvent {
  id: string;
  timestamp: number;
  message: string;
}

export interface LogFormat {
  functionName: string;
  serviceName: string;
  link: string;
  logStream: string;
  timestamp: number;
  logEvents: LogEvent[];
  eventFilter: string;
}
