
import ErrorSuppressionTable from '../components/ErrorSuppressionsList';

const ErrorSuppressionDashboard = () => {
  return (
    <div>
      <div>
        <div className="flex items-center">
          <div className="rounded-full bg-primary animate-pulse"></div>
          <h1 className="text-3xl font-semibold tracking-tight">Error Suppression Dashboard</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Manage error suppression rules for the Sauron microservice.<br />
          Add, edit or remove rules to control which errors are sent to Slack.
        </p>
        
        <div className="my-6">
          <h2 className="text-xl font-medium mb-4">Active Rules</h2>
          <ErrorSuppressionTable />
        </div>
      </div>
    </div>
  );
};

export default ErrorSuppressionDashboard;
