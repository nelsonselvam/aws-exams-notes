window.mcqData = {

  /* ─────────────────────────────────────────────
     DOMAIN 1 — Development with AWS Services
  ───────────────────────────────────────────── */

  "t11": [
    {
      "question": "A company is building an order-processing system. When a customer places an order, an inventory service, a billing service, and an email notification service must all process the event independently. Which architecture best implements this?",
      "options": [
        { "letter": "A", "text": "The order service synchronously calls each downstream service one at a time via REST." },
        { "letter": "B", "text": "Publish the order event to an SNS topic with three SQS queue subscriptions — one per downstream service." },
        { "letter": "C", "text": "The order service writes to a single SQS queue; each downstream service shares the same queue." },
        { "letter": "D", "text": "Use AWS Step Functions to synchronously invoke each service in sequence." }
      ],
      "answer": "B",
      "explanation": "This is the classic <strong>SNS fanout pattern</strong>. A single SNS topic fans out to three independent SQS queues. Each downstream service processes messages from its own queue independently and at its own pace. Option A creates tight coupling and a cascade failure risk. Option C means messages are consumed by only one of the services, not all three. Option D is synchronous orchestration — not an independent parallel fanout."
    },
    {
      "question": "A developer is calling a DynamoDB API from a Lambda function and receives a `ThrottlingException`. What is the recommended approach to handle this error in code?",
      "options": [
        { "letter": "A", "text": "Immediately retry the call in a tight loop until it succeeds." },
        { "letter": "B", "text": "Log the exception and fail the function — the event source mapping will retry." },
        { "letter": "C", "text": "Implement exponential backoff with jitter before each retry attempt." },
        { "letter": "D", "text": "Switch to strongly consistent reads to avoid throttling." }
      ],
      "answer": "C",
      "explanation": "<strong>Exponential backoff with jitter</strong> is the AWS-recommended retry strategy for retryable errors like throttling. It prevents a thundering-herd effect where all clients retry at the same moment. Tight loop retries (A) make throttling worse. Failing permanently (B) causes data loss. Strongly consistent reads (D) actually consume twice as many RCUs, which would worsen throttling."
    },
    {
      "question": "An application currently processes jobs by polling a database every 30 seconds. This approach creates high unnecessary database load. Which refactoring most reduces database load while keeping the components loosely coupled?",
      "options": [
        { "letter": "A", "text": "Reduce the polling interval to every 5 seconds." },
        { "letter": "B", "text": "Use a push-based architecture: write new jobs to an SQS queue; worker services poll the queue." },
        { "letter": "C", "text": "Create an Aurora read replica and point the polling queries to it." },
        { "letter": "D", "text": "Use AWS Step Functions to schedule the polling every 30 seconds." }
      ],
      "answer": "B",
      "explanation": "Replacing database polling with an <strong>SQS queue</strong> is the canonical decoupling pattern. The producer writes jobs to SQS once; workers use long polling to efficiently wait for jobs without hammering a database. This eliminates all polling-related DB load. Option C reduces read load but keeps the polling anti-pattern. Option D automates the poll but doesn't eliminate the underlying problem."
    },
    {
      "question": "A new e-commerce application must process payment events in the exact order they arrive and ensure each event is processed exactly once. Which AWS service meets these requirements?",
      "options": [
        { "letter": "A", "text": "Amazon SQS Standard queue" },
        { "letter": "B", "text": "Amazon SNS with ordering enabled" },
        { "letter": "C", "text": "Amazon SQS FIFO queue" },
        { "letter": "D", "text": "Amazon EventBridge" }
      ],
      "answer": "C",
      "explanation": "<strong>SQS FIFO queues</strong> guarantee strict ordering (First-In, First-Out) and exactly-once processing within a message group. SQS Standard queues offer best-effort ordering and at-least-once delivery (duplicates possible). SNS has no ordering guarantee. EventBridge is an event bus for routing, not an ordered queue."
    },
    {
      "question": "A company's real-time analytics pipeline needs to replay the last 24 hours of clickstream events after discovering a processing bug. Which service supports this requirement?",
      "options": [
        { "letter": "A", "text": "Amazon SQS Standard" },
        { "letter": "B", "text": "Amazon SNS" },
        { "letter": "C", "text": "Amazon Kinesis Data Streams" },
        { "letter": "D", "text": "Amazon EventBridge" }
      ],
      "answer": "C",
      "explanation": "<strong>Kinesis Data Streams</strong> retains records for 24 hours by default (up to 365 days with extended retention). Consumers can re-read data from any point in the retention window, enabling replay. SQS and SNS do not support replay — messages are deleted after consumption. EventBridge has no persistence for replay."
    },
    {
      "question": "A developer is building a multi-step order workflow: validate → charge payment → reserve inventory → send confirmation. Each step can take several seconds, and the workflow must track state, handle errors at each step, and retry failed steps. Which service is the best fit?",
      "options": [
        { "letter": "A", "text": "Amazon SQS FIFO queue with a visibility timeout for each step." },
        { "letter": "B", "text": "AWS Step Functions Standard Workflow." },
        { "letter": "C", "text": "A single Lambda function that calls each step in sequence." },
        { "letter": "D", "text": "Amazon EventBridge with a choreography pattern between services." }
      ],
      "answer": "B",
      "explanation": "<strong>AWS Step Functions Standard Workflows</strong> are built for stateful, multi-step orchestration with built-in error handling, retry logic, and full execution history. A single Lambda function (C) creates a monolithic handler with no visibility into which step failed. EventBridge choreography (D) lacks centralized error handling and state tracking. SQS (A) doesn't track workflow state across steps."
    },
    {
      "question": "A weather data provider wants to stream real-time sensor readings to multiple consumers: a dashboard, an archival system (S3), and an anomaly detection engine. All three need to process the same data independently. Which service fits this scenario?",
      "options": [
        { "letter": "A", "text": "Amazon SQS Standard queue — each consumer polls the same queue." },
        { "letter": "B", "text": "Amazon Kinesis Data Streams with three separate consumer applications." },
        { "letter": "C", "text": "Amazon SNS with the archival system as the only subscriber." },
        { "letter": "D", "text": "AWS Lambda with one function orchestrating all three consumers." }
      ],
      "answer": "B",
      "explanation": "<strong>Kinesis Data Streams</strong> natively supports multiple independent consumers reading the same stream concurrently — each consumer maintains its own shard iterator and position. SQS queues deliver each message to only one consumer. SNS could fan out but wouldn't provide the ordered, replayable stream semantics needed here. A single Lambda orchestrating all three creates tight coupling."
    },
    {
      "question": "An application on EC2 is making AWS API calls but no IAM credentials are configured as environment variables or in the credentials file. What does the AWS SDK do in this situation?",
      "options": [
        { "letter": "A", "text": "Throws a CredentialsNotFoundException immediately." },
        { "letter": "B", "text": "Makes unauthenticated calls to the public API endpoints." },
        { "letter": "C", "text": "Checks the EC2 Instance Metadata Service (IMDS) for credentials from the attached IAM Role." },
        { "letter": "D", "text": "Uses the root account credentials stored in the SDK's default configuration." }
      ],
      "answer": "C",
      "explanation": "The AWS SDK resolves credentials in a defined chain. When no credentials are found in earlier positions (environment variables, credentials file), the SDK checks the <strong>EC2 Instance Metadata Service (IMDS)</strong> at <code>169.254.169.254</code> to retrieve temporary credentials from the attached IAM Instance Profile. This is the recommended pattern for EC2 applications."
    }
  ],

  "t12": [
    {
      "question": "A Lambda function connects to an RDS database. During testing, the developer notices that DB connection setup takes 800ms on the first invocation but only 10ms on subsequent invocations in quick succession. What explains this behavior?",
      "options": [
        { "letter": "A", "text": "Lambda caches the query results in /tmp storage." },
        { "letter": "B", "text": "The database connection is initialized in the handler and cached in the execution context between warm invocations." },
        { "letter": "C", "text": "Lambda Provisioned Concurrency eliminates the connection overhead." },
        { "letter": "D", "text": "RDS caches the connection for the Lambda function's IP address." }
      ],
      "answer": "B",
      "explanation": "When a DB connection (or any expensive initialization) is placed <strong>outside the handler function</strong> in the global scope, it is initialized once during a cold start and <strong>cached in the execution context</strong> for subsequent warm invocations. This is the correct optimization pattern for Lambda. It's not query caching (A), provisioned concurrency (C), or RDS behavior (D)."
    },
    {
      "question": "A Lambda function processes images uploaded to S3. During a traffic spike, the function is invoked thousands of times simultaneously, causing an RDS database to reject connections with a 'too many connections' error. What is the MOST effective fix?",
      "options": [
        { "letter": "A", "text": "Increase Lambda memory to reduce function duration." },
        { "letter": "B", "text": "Enable Provisioned Concurrency for the Lambda function." },
        { "letter": "C", "text": "Place an Amazon RDS Proxy between Lambda and the RDS database." },
        { "letter": "D", "text": "Convert Lambda to use asynchronous invocation." }
      ],
      "answer": "C",
      "explanation": "<strong>RDS Proxy</strong> pools and multiplexes database connections. Instead of each Lambda invocation opening a new DB connection, all invocations share a connection pool managed by the proxy. This prevents connection exhaustion regardless of Lambda concurrency. Provisioned Concurrency (B) would make the problem worse by pre-warming more environments, each holding a connection."
    },
    {
      "question": "A Lambda function is configured with a timeout of 30 seconds and processes SQS messages. Some messages contain malformed data that causes the function to fail immediately. The same messages are repeatedly retried, blocking the queue for other messages. How should this be resolved?",
      "options": [
        { "letter": "A", "text": "Increase the visibility timeout to 60 seconds." },
        { "letter": "B", "text": "Configure a Dead-Letter Queue on the SQS queue and set maxReceiveCount to 3." },
        { "letter": "C", "text": "Set Lambda Reserved Concurrency to 1 to process messages one at a time." },
        { "letter": "D", "text": "Enable Lambda Destinations on the function." }
      ],
      "answer": "B",
      "explanation": "A <strong>Dead-Letter Queue (DLQ)</strong> with a <code>maxReceiveCount</code> isolates 'poison pill' messages after a set number of failed attempts. After 3 failures, the malformed message moves to the DLQ, allowing the queue to process other valid messages. Increasing visibility timeout (A) only delays the retry cycle. Reserved concurrency to 1 (C) slows throughput but doesn't fix the poison pill problem."
    },
    {
      "question": "A Lambda function needs to access a private Amazon RDS instance inside a VPC. After configuring the Lambda function with the VPC settings (subnet and security group), it can access RDS but can no longer call an external payment API over the internet. What is missing?",
      "options": [
        { "letter": "A", "text": "An Internet Gateway must be attached to the Lambda function's subnet." },
        { "letter": "B", "text": "The Lambda function must be placed in a public subnet with a public IP." },
        { "letter": "C", "text": "A NAT Gateway in a public subnet, with the Lambda function's private subnet routing outbound traffic through it." },
        { "letter": "D", "text": "An Elastic IP must be assigned to the Lambda function." }
      ],
      "answer": "C",
      "explanation": "When Lambda is placed inside a VPC, it loses its default internet access. To reach external endpoints, Lambda must be in a <strong>private subnet</strong> that routes outbound traffic through a <strong>NAT Gateway</strong> in a public subnet. Placing Lambda in a public subnet (B) does not grant internet access — Lambda does not have a public IP in a VPC. Internet Gateways route traffic for resources with public IPs, which Lambda doesn't have."
    },
    {
      "question": "A Lambda function is triggered by S3 ObjectCreated events. During a batch upload of 10,000 files, 25 functions fail due to a transient downstream error. How many times will Lambda retry those failed invocations?",
      "options": [
        { "letter": "A", "text": "Lambda does not retry on failure for S3 events." },
        { "letter": "B", "text": "Up to 2 retries (3 total attempts) with exponential backoff." },
        { "letter": "C", "text": "Continuously until the function succeeds." },
        { "letter": "D", "text": "Once, immediately after the failure." }
      ],
      "answer": "B",
      "explanation": "S3 invokes Lambda <strong>asynchronously</strong>. For async invocations, Lambda retries failed executions <strong>up to 2 times</strong> (3 total attempts) with delays between retries. After all retries are exhausted, the event is discarded (or sent to a configured DLQ/Destination). This behavior is specific to async invocation — synchronous (API GW) and poll-based (SQS) invocations behave differently."
    },
    {
      "question": "A developer wants to route 10% of production traffic to a new Lambda version for canary testing while keeping 90% on the stable version. How can this be configured?",
      "options": [
        { "letter": "A", "text": "Create two separate Lambda functions and use an ALB weighted target group." },
        { "letter": "B", "text": "Configure a Lambda alias with weighted routing: 90% to version 5, 10% to version 6." },
        { "letter": "C", "text": "Use Lambda Reserved Concurrency to allocate 10% of capacity to the new version." },
        { "letter": "D", "text": "Deploy the new version to a separate AWS account and use Route 53 weighted routing." }
      ],
      "answer": "B",
      "explanation": "<strong>Lambda aliases support weighted routing</strong> between two versions. Setting an alias like <code>live</code> to 90% on version 5 and 10% on version 6 enables canary testing without infrastructure changes. The API Gateway stage variable still points to the same alias. Option A (two functions + ALB) works but is operationally complex. Reserved concurrency (C) throttles, not routes traffic."
    },
    {
      "question": "After a Lambda function processes an SQS message batch, 8 of 10 messages succeed but 2 fail. The developer wants only the 2 failed messages to be retried, not the entire batch. What must the function return?",
      "options": [
        { "letter": "A", "text": "Throw an exception — Lambda will retry the entire batch automatically." },
        { "letter": "B", "text": "Return a response with a `batchItemFailures` list containing the message IDs of the 2 failed messages." },
        { "letter": "C", "text": "Delete the 8 successful messages manually from the queue and let the 2 failures time out." },
        { "letter": "D", "text": "Set the visibility timeout to 0 for the 2 failed messages using the SQS API." }
      ],
      "answer": "B",
      "explanation": "<strong>Partial Batch Response</strong> allows Lambda to report which specific items in a batch failed. Return <code>{\"batchItemFailures\": [{\"itemIdentifier\": \"msgId1\"}, {\"itemIdentifier\": \"msgId2\"}]}</code>. Lambda then only makes those 2 messages visible again for retry, while the 8 successful messages are deleted. Throwing an exception (A) retries the whole batch including already-successful messages."
    },
    {
      "question": "A production Lambda function experiences cold starts of 2–3 seconds, causing unacceptable latency for users accessing it through API Gateway. The function is written in Java. What is the most effective solution?",
      "options": [
        { "letter": "A", "text": "Increase the Lambda timeout to 30 seconds." },
        { "letter": "B", "text": "Enable Lambda SnapStart for the function." },
        { "letter": "C", "text": "Set the Reserved Concurrency to 100." },
        { "letter": "D", "text": "Switch the runtime to Python to reduce cold start time." }
      ],
      "answer": "B",
      "explanation": "<strong>Lambda SnapStart</strong> is specifically designed for Java runtimes (and Managed Runtime Interface). It takes a snapshot of the initialized execution environment (after the init phase), then restores from the snapshot instead of re-initializing — reducing cold starts from seconds to milliseconds. Provisioned Concurrency also works but SnapStart is the more targeted solution for Java. Increasing timeout (A) doesn't affect cold start latency."
    }
  ],

  "t13": [
    {
      "question": "A DynamoDB table stores IoT sensor readings. The partition key is `deviceStatus` (values: 'active', 'inactive', 'error'). After load testing, engineers observe severe throttling on the 'active' partition. What is the root cause?",
      "options": [
        { "letter": "A", "text": "The table is using On-Demand capacity mode which cannot handle IoT workloads." },
        { "letter": "B", "text": "The partition key has low cardinality, causing a hot partition where most writes concentrate on 'active'." },
        { "letter": "C", "text": "The sort key is not defined, which forces all items into the same partition." },
        { "letter": "D", "text": "IoT workloads require a GSI on the deviceStatus attribute." }
      ],
      "answer": "B",
      "explanation": "The core problem is a <strong>low-cardinality partition key</strong>. With only 3 possible values, almost all traffic concentrates on the 'active' partition — a classic hot partition. The fix is to use a high-cardinality key (like <code>deviceId</code>) as the partition key and use a GSI on <code>deviceStatus</code> for status-based queries. On-Demand mode (A) helps with capacity but doesn't fix hot partition distribution."
    },
    {
      "question": "A developer needs to retrieve all orders for a specific customer, sorted by order date. The DynamoDB table has `customerId` as the partition key and `orderDate` as the sort key. Which operation should be used?",
      "options": [
        { "letter": "A", "text": "Scan the table with a FilterExpression on customerId and orderDate." },
        { "letter": "B", "text": "Query the table using customerId as the key condition and a sort key condition on orderDate." },
        { "letter": "C", "text": "GetItem with customerId and orderDate as keys." },
        { "letter": "D", "text": "BatchGetItem with a list of customerId and orderDate combinations." }
      ],
      "answer": "B",
      "explanation": "<strong>Query</strong> is the correct and efficient operation. It reads only items matching the partition key (<code>customerId</code>) and can apply sort key conditions to filter/sort by <code>orderDate</code> within that partition. A Scan (A) reads the entire table and filters afterward — paying for all reads regardless of result size. GetItem (C) retrieves a single specific item, not a range. BatchGetItem (D) retrieves specific known keys, not a range."
    },
    {
      "question": "A gaming leaderboard application uses DynamoDB to store player scores. The query `GetItem` for top players is slow because millions of items are stored. Which service should be added to achieve microsecond read latency without changing application code?",
      "options": [
        { "letter": "A", "text": "Amazon ElastiCache Redis — add caching logic in the application." },
        { "letter": "B", "text": "Amazon DynamoDB Accelerator (DAX) — change only the endpoint in the application config." },
        { "letter": "C", "text": "Increase the DynamoDB table's read capacity units." },
        { "letter": "D", "text": "Enable DynamoDB Streams to pre-compute leaderboard results." }
      ],
      "answer": "B",
      "explanation": "<strong>DynamoDB Accelerator (DAX)</strong> is a fully managed, DynamoDB-compatible in-memory cache. It is API-compatible with the DynamoDB SDK — you only change the endpoint URL, and DAX handles caching transparently. ElastiCache (A) requires custom caching logic in the application. Increasing RCUs (C) improves throughput but not latency per se. Streams (D) is for change-data-capture, not query acceleration."
    },
    {
      "question": "An application uses Amazon S3 to store user profile pictures. A mobile app needs to allow users to upload photos directly from their device to S3 without routing through the application server. Which approach is correct?",
      "options": [
        { "letter": "A", "text": "Embed IAM access keys in the mobile app and use them to upload directly." },
        { "letter": "B", "text": "Make the S3 bucket public with write access enabled." },
        { "letter": "C", "text": "The server generates a presigned PUT URL and returns it to the client; the client uploads directly to S3 using the URL." },
        { "letter": "D", "text": "The client uploads to API Gateway which streams the file to S3." }
      ],
      "answer": "C",
      "explanation": "A <strong>presigned PUT URL</strong> is the correct pattern. The server generates a time-limited signed URL using its IAM credentials and sends it to the client. The client uploads directly to S3 using the URL — no credentials are exposed to the client and the server doesn't proxy large files. Embedding IAM keys (A) is a critical security vulnerability. Public write access (B) allows anyone to upload anything."
    },
    {
      "question": "A DynamoDB table uses Provisioned capacity. The application experiences sudden traffic spikes that cause `ProvisionedThroughputExceededException` errors. The team wants to handle spikes without pre-provisioning excess capacity permanently. What should they do?",
      "options": [
        { "letter": "A", "text": "Switch the table to On-Demand capacity mode." },
        { "letter": "B", "text": "Increase provisioned capacity to the maximum expected peak permanently." },
        { "letter": "C", "text": "Enable DynamoDB Streams to buffer write requests." },
        { "letter": "D", "text": "Add a GSI to distribute write traffic." }
      ],
      "answer": "A",
      "explanation": "<strong>On-Demand capacity mode</strong> automatically scales to handle any traffic volume without pre-provisioning. You pay per request rather than per provisioned unit. This eliminates throttling from unpredictable spikes. Permanently over-provisioning (B) wastes money. DynamoDB Streams (C) is for change-data-capture, not write buffering. GSIs (D) don't buffer writes — writes to a GSI consume additional capacity."
    },
    {
      "question": "An application stores user session data in Amazon ElastiCache. The team wants to ensure that if the primary Redis node fails, sessions are not lost and the application continues with minimal disruption. Which configuration is required?",
      "options": [
        { "letter": "A", "text": "Use a Memcached cluster with multiple nodes for automatic failover." },
        { "letter": "B", "text": "Use Redis with a replication group (primary + at least one replica) and enable Multi-AZ automatic failover." },
        { "letter": "C", "text": "Enable Redis cluster mode with sharding across 3 nodes." },
        { "letter": "D", "text": "Store a backup copy of sessions in an S3 bucket every 5 minutes." }
      ],
      "answer": "B",
      "explanation": "<strong>Redis with Multi-AZ automatic failover</strong> replicates data to one or more replica nodes in different AZs. If the primary fails, ElastiCache automatically promotes a replica to primary — typically within 1–2 minutes. Memcached (A) has no replication; if a node fails, all data on that node is lost. Cluster mode (C) adds sharding but is about scale, not the specific failover for this scenario."
    },
    {
      "question": "A developer is accessing a DynamoDB item using `GetItem`. Another write just occurred to the same item 50ms ago. The `GetItem` returns the old value. Which consistency model is being used, and how can this be changed?",
      "options": [
        { "letter": "A", "text": "Strongly consistent — this is expected behavior; there is no way to get newer data faster." },
        { "letter": "B", "text": "Eventually consistent (default) — set `ConsistentRead=True` in the GetItem request to get strongly consistent reads." },
        { "letter": "C", "text": "Eventually consistent — enable DynamoDB Streams to receive the latest data." },
        { "letter": "D", "text": "Strongly consistent — add a GSI to get the latest version of the item." }
      ],
      "answer": "B",
      "explanation": "DynamoDB <strong>GetItem defaults to eventually consistent reads</strong>, which may return slightly stale data. Setting <code>ConsistentRead=True</code> enables a strongly consistent read that always returns the most up-to-date committed data — at the cost of consuming 2× RCUs (1 RCU per 4 KB instead of 0.5). Streams (C) notify of changes but don't make GetItem return newer data."
    },
    {
      "question": "A Lambda function reads from an S3 bucket using the AWS SDK. The function's execution role has `s3:GetObject` permission, but calls are failing with `AccessDenied`. The S3 objects were recently re-encrypted with a customer-managed KMS key. What is missing?",
      "options": [
        { "letter": "A", "text": "The Lambda function needs `s3:PutObject` in addition to `s3:GetObject`." },
        { "letter": "B", "text": "The Lambda execution role must also have `kms:Decrypt` permission, and the KMS key policy must allow the role to use the key." },
        { "letter": "C", "text": "The S3 bucket policy must explicitly allow the Lambda function's ARN." },
        { "letter": "D", "text": "Lambda cannot decrypt SSE-KMS encrypted objects; use SSE-S3 instead." }
      ],
      "answer": "B",
      "explanation": "Reading an SSE-KMS encrypted S3 object requires two permissions: <code>s3:GetObject</code> on the bucket AND <code>kms:Decrypt</code> on the KMS key. Furthermore, the <strong>KMS key policy</strong> must explicitly allow the Lambda execution role to perform the Decrypt operation — IAM policies alone are not sufficient for KMS access without a permissive key policy."
    }
  ],

  /* ─────────────────────────────────────────────
     DOMAIN 2 — Security
  ───────────────────────────────────────────── */

  "t21": [
    {
      "question": "A mobile app allows users to sign in with their Google account. After authentication, the app needs to upload user photos directly to a user-specific S3 prefix. Which combination of services should be used?",
      "options": [
        { "letter": "A", "text": "IAM Identity Center + S3 bucket policy" },
        { "letter": "B", "text": "Cognito User Pool (authenticates with Google) + Cognito Identity Pool (exchanges token for STS credentials)" },
        { "letter": "C", "text": "Cognito User Pool only — User Pool tokens can directly authorize S3 API calls" },
        { "letter": "D", "text": "Embed IAM access keys in the app with an S3 bucket policy restricting by username" }
      ],
      "answer": "B",
      "explanation": "<strong>Cognito User Pool</strong> handles authentication with social IdPs (Google) and returns JWT tokens. The <strong>Identity Pool</strong> then exchanges those JWTs for temporary AWS STS credentials scoped to an IAM role. Only the STS credentials can authorize direct AWS API calls like S3 PutObject. User Pool JWTs (C) authenticate users at the application level — they cannot authorize AWS service API calls. Embedding IAM keys (D) is a critical vulnerability."
    },
    {
      "question": "An API Gateway REST API uses a Lambda Authorizer to validate JWT tokens. The authorizer Lambda is invoked on every request, adding 150ms of latency. How can this latency be reduced without changing the authorization logic?",
      "options": [
        { "letter": "A", "text": "Switch to a Cognito User Pool authorizer." },
        { "letter": "B", "text": "Enable authorizer result caching with a TTL (e.g., 300 seconds)." },
        { "letter": "C", "text": "Run the Lambda authorizer with more memory." },
        { "letter": "D", "text": "Move authorization logic into each backend Lambda function." }
      ],
      "answer": "B",
      "explanation": "API Gateway Lambda Authorizer results can be <strong>cached by the token value</strong> for a configurable TTL. Once a token is validated, subsequent requests with the same token return the cached IAM policy without invoking the authorizer Lambda — eliminating the 150ms overhead for warm requests. This is the purpose-built solution. Moving auth into backend functions (D) duplicates logic and adds coupling."
    },
    {
      "question": "A microservices application runs on ECS. Service A needs to call a private endpoint on Service B. Service B is behind an ALB with IAM authorization. How should Service A authenticate its requests to Service B?",
      "options": [
        { "letter": "A", "text": "Service A uses a hardcoded API key stored in an environment variable." },
        { "letter": "B", "text": "Service A uses its ECS Task IAM Role to sign requests with Signature Version 4 (Sig V4)." },
        { "letter": "C", "text": "Service A calls Cognito to obtain a JWT token and passes it in the Authorization header." },
        { "letter": "D", "text": "Service A calls sts:AssumeRole to get root user credentials." }
      ],
      "answer": "B",
      "explanation": "For internal service-to-service calls on AWS using IAM authorization, the calling service uses its attached <strong>IAM Role (ECS Task Role)</strong> to sign HTTP requests with <strong>Signature Version 4</strong>. The AWS SDK can do this automatically. No static credentials are needed. Cognito JWTs (C) are for user authentication in applications, not service-to-service IAM auth. Root credentials (D) is a serious anti-pattern."
    },
    {
      "question": "A developer needs to add a custom attribute (`department`) to the JWT access tokens returned by Cognito User Pool to implement fine-grained authorization in API backends. How can this be done?",
      "options": [
        { "letter": "A", "text": "Modify the API Gateway Lambda Authorizer to add the claim after token validation." },
        { "letter": "B", "text": "Use a Cognito Pre-Token Generation Lambda trigger to add custom claims to the token before it is issued." },
        { "letter": "C", "text": "Add the department attribute to the user's profile — it is included in all tokens automatically." },
        { "letter": "D", "text": "Switch from User Pool to Identity Pool tokens, which include custom attributes." }
      ],
      "answer": "B",
      "explanation": "The <strong>Cognito Pre-Token Generation Lambda trigger</strong> is invoked before Cognito issues tokens and allows you to add, suppress, or modify claims in the token. This is the correct, purpose-built way to inject custom attributes (like <code>department</code>) into JWTs. Custom profile attributes (C) are stored in the user directory but are NOT automatically included in tokens — they must be explicitly added via the trigger."
    },
    {
      "question": "A developer is writing a script that will run from a laptop to interact with AWS services. The script uses the boto3 SDK. Which is the MOST secure way to provide credentials?",
      "options": [
        { "letter": "A", "text": "Hardcode the IAM access keys directly in the script source file." },
        { "letter": "B", "text": "Set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables in the terminal session." },
        { "letter": "C", "text": "Configure a named profile in ~/.aws/credentials with the developer's IAM user keys." },
        { "letter": "D", "text": "Configure a named profile in ~/.aws/config using IAM Identity Center (SSO) for short-lived credentials." }
      ],
      "answer": "D",
      "explanation": "Using <strong>IAM Identity Center (SSO)</strong> with <code>aws configure sso</code> provides short-lived, automatically-rotating credentials tied to the developer's identity. Hardcoding (A) is the worst option — credentials can be accidentally committed to git. Environment variables (B) persist in shell history. A static credentials file (C) uses long-lived access keys which are a security risk if the laptop is compromised."
    }
  ],

  "t22": [
    {
      "question": "A developer needs to encrypt a 200 MB data file using AWS KMS. When they call `kms:Encrypt` directly with the file data, they receive an error. What is the correct approach?",
      "options": [
        { "letter": "A", "text": "Compress the file below 4 KB and then call kms:Encrypt." },
        { "letter": "B", "text": "Use envelope encryption: call GenerateDataKey to get a data key, encrypt the file locally with the data key, then store the encrypted data key alongside the file." },
        { "letter": "C", "text": "Split the file into 4 KB chunks and call kms:Encrypt on each chunk." },
        { "letter": "D", "text": "Upload the file to S3 first, then call kms:Encrypt on the S3 object ARN." }
      ],
      "answer": "B",
      "explanation": "KMS <code>Encrypt</code> is limited to <strong>4 KB</strong> of data. For larger data, use <strong>envelope encryption</strong>: call <code>GenerateDataKey</code> to get a plaintext + encrypted data key (DEK). Encrypt the 200 MB file locally with the plaintext DEK (AES-256). Store the encrypted DEK alongside the encrypted file. For decryption, call <code>kms:Decrypt</code> on the encrypted DEK to recover the plaintext DEK, then decrypt the file locally. The file data never goes to KMS."
    },
    {
      "question": "A compliance requirement states that S3 object encryption keys must be rotated exactly every 90 days, and the customer must own the key material. AWS KMS automatic key rotation is enabled. Does this satisfy the requirement?",
      "options": [
        { "letter": "A", "text": "Yes — automatic KMS rotation satisfies both requirements." },
        { "letter": "B", "text": "No — automatic KMS rotation happens every 365 days and cannot be customized to 90 days." },
        { "letter": "C", "text": "No — automatic rotation works, but the customer does not own the key material in KMS." },
        { "letter": "D", "text": "Yes — you can configure automatic rotation to any interval in the KMS console." }
      ],
      "answer": "B",
      "explanation": "AWS KMS <strong>automatic key rotation is fixed at 365 days</strong> and cannot be changed. For a 90-day rotation requirement, you must implement <strong>manual key rotation</strong>: create a new CMK every 90 days and update your application's key alias to point to the new CMK, retaining the old key for decryption of previously encrypted data."
    },
    {
      "question": "An application must store sensitive documents in S3 with the requirement that AWS personnel must never have access to the encryption keys — not even temporarily. Which S3 encryption option satisfies this?",
      "options": [
        { "letter": "A", "text": "SSE-S3 (AWS-managed keys)" },
        { "letter": "B", "text": "SSE-KMS with a Customer Managed Key (CMK)" },
        { "letter": "C", "text": "SSE-C (Customer-Provided Keys)" },
        { "letter": "D", "text": "SSE-KMS with an AWS Managed Key" }
      ],
      "answer": "C",
      "explanation": "With <strong>SSE-C (Customer-Provided Keys)</strong>, the customer provides the encryption key in every API request header. AWS uses the key to encrypt the object and then immediately discards it — the key is never stored on AWS. With SSE-KMS (B/D), the key material is stored and managed in AWS KMS. With SSE-S3 (A), AWS fully manages the keys. SSE-C is the only option where AWS never retains the key."
    },
    {
      "question": "A Lambda function in Account A needs to decrypt data encrypted with a Customer Managed KMS Key in Account B. The Lambda execution role in Account A has `kms:Decrypt` in its IAM policy. Is this sufficient?",
      "options": [
        { "letter": "A", "text": "Yes — IAM policies are sufficient for cross-account KMS access." },
        { "letter": "B", "text": "No — the KMS key in Account B must also have a key policy that explicitly allows the IAM role from Account A to use it." },
        { "letter": "C", "text": "No — cross-account KMS access is not supported; the key must be copied to Account A." },
        { "letter": "D", "text": "Yes — because both accounts are in the same AWS Organization, access is automatic." }
      ],
      "answer": "B",
      "explanation": "KMS access requires <strong>both</strong> the IAM policy (in the caller's account) AND the <strong>KMS key policy</strong> (in the key's account) to allow the operation. For cross-account use, the KMS key policy in Account B must explicitly list the IAM role ARN from Account A as an allowed principal. IAM policies alone are insufficient for KMS — the key policy is a required second gate."
    },
    {
      "question": "A company is deploying a CloudFront distribution with a custom domain (api.example.com) using HTTPS. They have an ACM certificate provisioned in `ap-southeast-1`. When configuring CloudFront, the certificate is not visible in the dropdown. Why?",
      "options": [
        { "letter": "A", "text": "The certificate is pending validation and has not been issued yet." },
        { "letter": "B", "text": "CloudFront requires ACM certificates to be provisioned in `us-east-1` (N. Virginia); certificates in other regions are not usable with CloudFront." },
        { "letter": "C", "text": "The certificate must be imported, not requested through ACM." },
        { "letter": "D", "text": "The domain name in the certificate does not match the CloudFront distribution's domain." }
      ],
      "answer": "B",
      "explanation": "This is a hard AWS rule: <strong>ACM certificates for CloudFront must be in the <code>us-east-1</code> (US East N. Virginia) region</strong>. This applies to both requested and imported certificates. Certificates in any other region are invisible to CloudFront. The team must re-provision the certificate in us-east-1."
    }
  ],

  "t23": [
    {
      "question": "A Lambda function connects to an RDS MySQL database. The database password is currently stored as a plaintext environment variable. The security team requires the password to be automatically rotated every 30 days with no application downtime. What is the recommended solution?",
      "options": [
        { "letter": "A", "text": "Store the password in SSM Parameter Store SecureString and enable the auto-rotation flag." },
        { "letter": "B", "text": "Store the password in AWS Secrets Manager and enable automatic rotation with the provided RDS rotation Lambda." },
        { "letter": "C", "text": "Re-deploy the Lambda function with an updated environment variable every 30 days using a scheduled EventBridge rule." },
        { "letter": "D", "text": "Use AWS KMS to encrypt the environment variable and rotate the KMS key every 30 days." }
      ],
      "answer": "B",
      "explanation": "<strong>AWS Secrets Manager</strong> provides native automatic rotation for RDS credentials using a managed Lambda rotation function. It rotates the DB password, updates the secret, and applications that fetch from Secrets Manager automatically receive the new credential without any redeployment or downtime. SSM Parameter Store (A) has no built-in auto-rotation. KMS rotation (D) rotates the encryption key for the secret, not the database password itself."
    },
    {
      "question": "A development team stores application configuration (non-sensitive) and database connection strings (sensitive) together. They want a free, hierarchical storage solution for both. Which service fits best?",
      "options": [
        { "letter": "A", "text": "AWS Secrets Manager — store all config and secrets together." },
        { "letter": "B", "text": "SSM Parameter Store — use String type for config and SecureString for sensitive values; organize using path hierarchy like /app/prod/db-url." },
        { "letter": "C", "text": "Lambda environment variables — separate functions for sensitive vs non-sensitive config." },
        { "letter": "D", "text": "S3 with server-side encryption for sensitive configuration files." }
      ],
      "answer": "B",
      "explanation": "<strong>SSM Parameter Store</strong> is the ideal fit: it is free for Standard parameters, supports both String (config) and SecureString (KMS-encrypted secrets) types in the same service, and uses a hierarchical path-based naming (e.g., <code>/app/prod/db-url</code>) for organized access. Secrets Manager (A) charges $0.40/secret/month and is better suited for secrets needing auto-rotation. Lambda env vars (C) are function-scoped, not a shared config store."
    },
    {
      "question": "A developer accidentally logged full user objects (including email and date of birth) to CloudWatch Logs. The security team identifies this as a PII leak. What immediate steps should be taken, and how should logging be fixed?",
      "options": [
        { "letter": "A", "text": "Delete the CloudWatch Log group; update logging to exclude PII fields from structured log output." },
        { "letter": "B", "text": "Encrypt the CloudWatch Log group with KMS; PII data is now secure." },
        { "letter": "C", "text": "The logs are only visible internally; no action needed." },
        { "letter": "D", "text": "Move all logging to S3 with server-side encryption." }
      ],
      "answer": "A",
      "explanation": "The correct response is to <strong>delete or purge the offending log data</strong> immediately to remediate the exposure, then fix the logging code to mask or exclude PII fields. Structured logging should log only non-sensitive attributes (e.g., userId hash rather than email). Encrypting the log group (B) protects at-rest storage but the PII data is already exposed to anyone with log read access. Moving to S3 (D) doesn't fix the core problem of logging PII."
    }
  ],

  /* ─────────────────────────────────────────────
     DOMAIN 3 — Deployment
  ───────────────────────────────────────────── */

  "t31": [
    {
      "question": "A developer has a SAM template that defines a Lambda function with an API Gateway trigger. After running `sam deploy`, they find that the API Gateway endpoint is not created. Which part of the template is most likely missing or incorrect?",
      "options": [
        { "letter": "A", "text": "The `Transform: AWS::Serverless-2016-10-31` declaration is missing from the template." },
        { "letter": "B", "text": "The Lambda function's memory is set too low." },
        { "letter": "C", "text": "The Globals section is not defined." },
        { "letter": "D", "text": "The `sam build` step was skipped before `sam deploy`." }
      ],
      "answer": "A",
      "explanation": "The <code>Transform: AWS::Serverless-2016-10-31</code> line is what <strong>identifies a template as a SAM template</strong> and triggers the SAM transform during deployment. Without it, CloudFormation treats the template as standard CFN and does not understand <code>AWS::Serverless::Function</code> resource types or the <code>Events</code> property that creates API Gateway. Skipping <code>sam build</code> (D) would cause a different error (missing artifacts)."
    },
    {
      "question": "A team wants to preview the changes a CloudFormation template update will make to a production stack before executing it. Which feature should they use?",
      "options": [
        { "letter": "A", "text": "CloudFormation Drift Detection" },
        { "letter": "B", "text": "CloudFormation Change Sets" },
        { "letter": "C", "text": "CloudFormation Stack Policy" },
        { "letter": "D", "text": "AWS CDK Diff command" }
      ],
      "answer": "B",
      "explanation": "<strong>CloudFormation Change Sets</strong> show a preview of resource changes (Add/Modify/Remove) that will occur when the update is applied — without actually making the changes. This is the purpose-built CloudFormation feature for change preview. Drift Detection (A) identifies manual changes made outside CloudFormation. Stack Policy (C) protects resources during updates but does not preview changes. CDK Diff (D) is CDK-specific, not native to CloudFormation stacks."
    },
    {
      "question": "An application uses AWS AppConfig to manage feature flags. A new flag is deployed but the Lambda function is still reading the old configuration. What is the most likely cause?",
      "options": [
        { "letter": "A", "text": "AppConfig changes require a Lambda function redeployment to take effect." },
        { "letter": "B", "text": "The Lambda function is caching the configuration in memory and not polling AppConfig for updates during its execution." },
        { "letter": "C", "text": "AppConfig only works with EC2 instances, not Lambda." },
        { "letter": "D", "text": "The AppConfig deployment is still in progress because it uses a canary strategy." }
      ],
      "answer": "B",
      "explanation": "The correct way to use AppConfig is to poll for configuration updates at runtime, typically using a cache with a configurable interval. If the Lambda function fetches configuration once at cold start and caches it indefinitely, it will not receive updates until a new cold start. The AppConfig Lambda extension handles polling automatically on a configurable interval — use it instead of a single fetch at init time."
    }
  ],

  "t32": [
    {
      "question": "A developer wants to test an API Gateway endpoint that's backed by Lambda in a dev stage without affecting the production stage. The API uses stage variables to route to different Lambda aliases. What is the correct approach?",
      "options": [
        { "letter": "A", "text": "Create a second identical API Gateway REST API for the dev environment." },
        { "letter": "B", "text": "Deploy the API to a `dev` stage with a stage variable pointing to the Lambda `dev` alias, leaving `prod` stage variables unchanged." },
        { "letter": "C", "text": "Update the production Lambda function directly and roll back if testing fails." },
        { "letter": "D", "text": "Use sam local start-api instead of deploying to API Gateway for all testing." }
      ],
      "answer": "B",
      "explanation": "<strong>API Gateway stages with stage variables</strong> are the purpose-built solution for environment isolation within a single API. The <code>dev</code> stage variable points to the Lambda <code>dev</code> alias (pointing to $LATEST or a test version). The <code>prod</code> stage is unchanged. Testing against a real deployed stage catches integration issues that local testing (D) misses. Creating a duplicate API (A) duplicates infrastructure and management overhead."
    },
    {
      "question": "A developer uses `sam local invoke` to test a Lambda function locally. The test passes locally but the function fails in AWS with an AccessDeniedException when calling DynamoDB. What is the most likely explanation?",
      "options": [
        { "letter": "A", "text": "SAM local uses a different Python runtime version than AWS Lambda." },
        { "letter": "B", "text": "SAM local uses the developer's local AWS credentials (which may have broad access), while the deployed Lambda uses its execution role which may lack DynamoDB permissions." },
        { "letter": "C", "text": "SAM local does not support DynamoDB integrations." },
        { "letter": "D", "text": "The DynamoDB table doesn't exist in the local environment." }
      ],
      "answer": "B",
      "explanation": "This is a common pitfall: <code>sam local invoke</code> uses your <strong>local AWS credentials</strong> (from environment or ~/.aws/credentials), which often have broad developer access. The deployed Lambda uses its <strong>IAM execution role</strong>, which may have minimal permissions. A call that succeeds locally (using your admin credentials) can fail in production if the execution role lacks the required DynamoDB permissions. Always test with minimal permissions that match the execution role."
    }
  ],

  "t33": [
    {
      "question": "A team wants to deploy a new Lambda version to production with the ability to instantly roll back if errors are detected, without any downtime. Which approach achieves this?",
      "options": [
        { "letter": "A", "text": "Deploy directly to $LATEST and monitor errors. Redeploy the previous code if errors are detected." },
        { "letter": "B", "text": "Publish a new Lambda version, update the production alias to point to the new version. If errors occur, update the alias back to the previous version number." },
        { "letter": "C", "text": "Create a new Lambda function and update the API Gateway integration to point to it." },
        { "letter": "D", "text": "Use CloudFormation rollback triggers to automatically redeploy on errors." }
      ],
      "answer": "B",
      "explanation": "<strong>Lambda versions and aliases</strong> enable instant, zero-downtime rollback. The <code>live</code> alias points to a specific published version (e.g., v10). If v11 causes errors, updating the alias to point back to v10 is immediate and atomic. Deploying to $LATEST (A) is mutable and requires redeploying the old code file. Creating a new function (C) requires API Gateway changes. Version/alias rollback is the purpose-built mechanism."
    },
    {
      "question": "A CI/CD pipeline builds a Docker image for a Lambda function and pushes it to ECR. The pipeline tags images with `latest` and the git commit SHA. The Lambda function is currently configured to use the `latest` tag. After the pipeline pushes a new image, the Lambda function is NOT picking up the new image automatically. Why?",
      "options": [
        { "letter": "A", "text": "Lambda container image functions require a cold start before they use new images." },
        { "letter": "B", "text": "Lambda resolves the container image URI at deployment time, not at invocation time. The function must be updated to point to the new image URI (new digest or specific tag)." },
        { "letter": "C", "text": "The `latest` tag is reserved for ECR public repositories; private repositories must use versioned tags." },
        { "letter": "D", "text": "Lambda cannot use the `latest` tag; only SHA-based tags are supported." }
      ],
      "answer": "B",
      "explanation": "Lambda <strong>resolves the image URI at deployment time</strong>, not at invocation time. Even though the <code>:latest</code> tag in ECR now points to a new image, Lambda still runs the image digest it was configured with when the function was last updated. To pick up the new image, the Lambda function must be updated (<code>UpdateFunctionCode</code>) with the new image URI or digest. Best practice: use immutable image tags (commit SHA) and explicitly update the function in CI/CD."
    }
  ],

  "t34": [
    {
      "question": "A company uses CodeDeploy to deploy a Lambda function. They want to gradually shift traffic to the new version over 10 minutes, shifting 10% every minute, with automatic rollback if the error rate exceeds 1%. Which deployment configuration and mechanism should be used?",
      "options": [
        { "letter": "A", "text": "LambdaAllAtOnce with a CloudWatch Alarm rollback trigger." },
        { "letter": "B", "text": "LambdaLinear10PercentEvery1Minute deployment configuration with a CloudWatch Alarm configured in the CodeDeploy deployment group." },
        { "letter": "C", "text": "LambdaCanary10Percent10Minutes with a manual approval step." },
        { "letter": "D", "text": "Use Lambda Reserved Concurrency to limit traffic to 10% for 10 minutes." }
      ],
      "answer": "B",
      "explanation": "<strong>LambdaLinear10PercentEvery1Minute</strong> shifts 10% of traffic to the new version every minute (100% in 10 minutes). Attaching a <strong>CloudWatch Alarm</strong> to the CodeDeploy deployment group enables automatic rollback — if the alarm fires (e.g., error rate &gt; 1%), CodeDeploy immediately routes all traffic back to the previous version. This is the exact combination the question describes. Canary (C) shifts a fixed percentage then waits, not linear."
    },
    {
      "question": "An Elastic Beanstalk application is running in production. The team needs to deploy a new version with zero downtime, while maintaining full capacity (no reduction in available instances) during the deployment. Which policy should they choose?",
      "options": [
        { "letter": "A", "text": "All at once" },
        { "letter": "B", "text": "Rolling" },
        { "letter": "C", "text": "Rolling with additional batch" },
        { "letter": "D", "text": "Immutable" }
      ],
      "answer": "C",
      "explanation": "<strong>Rolling with additional batch</strong> launches a new batch of instances with the new version before taking any existing instances out of service. This maintains 100% capacity throughout the deployment. Standard Rolling (B) removes instances from the load balancer during deployment, temporarily reducing capacity. All at once (A) causes downtime. Immutable (D) also maintains full capacity and has the fastest rollback but is more expensive."
    },
    {
      "question": "A developer pushes code to a CodeCommit repository. The team expects this to trigger a CodePipeline execution, but nothing happens. What is the most likely cause?",
      "options": [
        { "letter": "A", "text": "CodePipeline does not support CodeCommit as a source." },
        { "letter": "B", "text": "The pipeline's IAM service role lacks permission to poll the CodeCommit repository." },
        { "letter": "C", "text": "CodePipeline polls CodeCommit every 60 minutes by default, so the pipeline has not triggered yet." },
        { "letter": "D", "text": "The CloudWatch Events (EventBridge) rule that detects CodeCommit pushes and triggers the pipeline is disabled or not configured." }
      ],
      "answer": "D",
      "explanation": "CodePipeline uses an <strong>Amazon EventBridge rule</strong> to detect CodeCommit push events and automatically start the pipeline. If this rule is disabled, deleted, or was never created, pushes to the repository will not trigger the pipeline. This is the most common misconfiguration. CodePipeline does support CodeCommit (A is false). The IAM role (B) would cause a different error if the pipeline ran but couldn't access the repo."
    },
    {
      "question": "A team uses CodeBuild to build and test their application. The build is failing with an error that the `pytest` command is not found. The `buildspec.yml` install phase only runs `pip install awscli`. What is missing?",
      "options": [
        { "letter": "A", "text": "The CodeBuild project is using the wrong compute type." },
        { "letter": "B", "text": "The install phase must include `pip install pytest` (or `pip install -r requirements.txt`) before the build phase runs tests." },
        { "letter": "C", "text": "pytest must be pre-installed by creating a custom CodeBuild Docker image." },
        { "letter": "D", "text": "Testing with pytest must be done in a separate CodeBuild project." }
      ],
      "answer": "B",
      "explanation": "CodeBuild starts from a fresh managed environment for each build. Dependencies are not cached between builds by default. The <strong>install phase</strong> in <code>buildspec.yml</code> must explicitly install all required packages. Adding <code>pip install pytest</code> (or better, <code>pip install -r requirements.txt</code> with pytest listed in the requirements file) to the install commands resolves the issue. A custom image (C) is valid but unnecessary overhead for this simple case."
    }
  ],

  /* ─────────────────────────────────────────────
     DOMAIN 4 — Troubleshooting and Optimization
  ───────────────────────────────────────────── */

  "t41": [
    {
      "question": "An API Gateway + Lambda application returns HTTP 502 Bad Gateway errors intermittently. CloudWatch metrics show Lambda invocation errors. Where should the developer look first to find the root cause?",
      "options": [
        { "letter": "A", "text": "API Gateway access logs — they contain the detailed Lambda error message." },
        { "letter": "B", "text": "The Lambda function's CloudWatch Log group (/aws/lambda/functionName) for exception stack traces." },
        { "letter": "C", "text": "VPC Flow Logs — the Lambda function may be losing network connectivity." },
        { "letter": "D", "text": "AWS CloudTrail — look for failed API calls from the Lambda function." }
      ],
      "answer": "B",
      "explanation": "A 502 from API Gateway means the backend (Lambda) threw an unhandled exception or returned a malformed response. The <strong>Lambda function's CloudWatch Log group</strong> contains the full error message, exception type, and stack trace — the essential information for root cause analysis. API Gateway access logs (A) show request/response metadata but not the Lambda-side error detail. CloudTrail (D) records API management calls, not function execution errors."
    },
    {
      "question": "A developer needs to find all requests from the last hour where a Lambda function's duration exceeded 5000ms. Which tool and query should be used?",
      "options": [
        { "letter": "A", "text": "AWS CloudTrail — filter by Lambda function name and duration." },
        { "letter": "B", "text": "CloudWatch Logs Insights — query the Lambda log group with `filter @duration > 5000`." },
        { "letter": "C", "text": "AWS X-Ray — filter traces by service name and response time > 5000ms." },
        { "letter": "D", "text": "CloudWatch Metrics — set a threshold alarm on the Duration metric." }
      ],
      "answer": "B",
      "explanation": "<strong>CloudWatch Logs Insights</strong> can query Lambda REPORT log lines which contain the duration field. The query <code>filter @type = \"REPORT\" | filter @duration > 5000 | sort @timestamp desc</code> returns all slow invocations. X-Ray (C) also shows duration but is trace-centric and best for distributed tracing; Logs Insights is better for bulk historical analysis. CloudWatch Metrics (D) shows aggregate statistics, not individual slow requests. CloudTrail (A) records management API calls, not Lambda execution data."
    },
    {
      "question": "A distributed application spans API Gateway, Lambda, DynamoDB, and an external payment API. Users report intermittent slowness but logs show no errors. What is the best tool to identify which component is adding latency?",
      "options": [
        { "letter": "A", "text": "CloudWatch Container Insights" },
        { "letter": "B", "text": "AWS X-Ray Service Map and trace analysis" },
        { "letter": "C", "text": "CloudWatch Logs Insights queries on each service separately" },
        { "letter": "D", "text": "AWS CloudTrail event history" }
      ],
      "answer": "B",
      "explanation": "<strong>AWS X-Ray Service Map</strong> provides a visual end-to-end view of the request flow across all services, with latency data per segment and subsegment. You can identify at a glance which component (e.g., the payment API) is the bottleneck. Querying logs separately (C) requires correlating across multiple log groups manually — tedious and error-prone. CloudTrail (D) is for auditing API management calls, not measuring request latency."
    },
    {
      "question": "A Lambda function's REPORT log shows `Init Duration: 3245.12 ms` for some invocations but not others. What does this indicate, and how can it be resolved for a latency-critical path?",
      "options": [
        { "letter": "A", "text": "`Init Duration` indicates the function exceeded its timeout; increase the timeout to 5 minutes." },
        { "letter": "B", "text": "`Init Duration` appears on cold starts — a new execution environment was initialized. Configure Provisioned Concurrency to pre-warm environments and eliminate cold starts." },
        { "letter": "C", "text": "`Init Duration` is the DynamoDB query time; optimize the DynamoDB access pattern." },
        { "letter": "D", "text": "`Init Duration` is normal Lambda overhead and cannot be reduced." }
      ],
      "answer": "B",
      "explanation": "<code>Init Duration</code> in Lambda REPORT logs appears <strong>only on cold starts</strong> — it measures the time to initialize the execution environment (download code, start runtime, run global init code). Subsequent warm invocations have no Init Duration. For latency-critical functions, <strong>Provisioned Concurrency</strong> pre-warms the specified number of execution environments, eliminating cold starts entirely at the cost of a continuous charge."
    }
  ],

  "t42": [
    {
      "question": "A developer wants to track a custom business metric — number of orders processed — from a Lambda function without making additional API calls that add latency. Which approach should they use?",
      "options": [
        { "letter": "A", "text": "Call `cloudwatch:PutMetricData` synchronously inside the Lambda handler for each order." },
        { "letter": "B", "text": "Write metric values in the CloudWatch Logs Embedded Metric Format (EMF) — metrics are extracted automatically from the log output." },
        { "letter": "C", "text": "Write the count to a DynamoDB table and use a CloudWatch metric filter on the DynamoDB stream." },
        { "letter": "D", "text": "Send the metric to CloudWatch via SQS after the function completes." }
      ],
      "answer": "B",
      "explanation": "<strong>Embedded Metric Format (EMF)</strong> embeds metric values in the Lambda's standard JSON log output. CloudWatch Logs automatically extracts the metrics without any additional API calls from your code. This adds zero latency to the function compared to calling <code>PutMetricData</code> synchronously (A), which adds network latency and a potential failure point. EMF is the recommended modern pattern for custom metrics in Lambda."
    },
    {
      "question": "An engineering team wants to be alerted when Lambda errors occur, but only if the error rate is also high (i.e., not alert on a single error in a low-traffic period). They want to combine an `Errors` alarm and a `ErrorRate` math expression alarm. Which CloudWatch alarm type enables this?",
      "options": [
        { "letter": "A", "text": "Anomaly Detection Alarm" },
        { "letter": "B", "text": "Composite Alarm with AND logic between the two individual alarms" },
        { "letter": "C", "text": "Two separate alarms with SNS notification on each" },
        { "letter": "D", "text": "A single metric math alarm combining both conditions in one expression" }
      ],
      "answer": "B",
      "explanation": "A <strong>Composite Alarm</strong> evaluates the state of multiple child alarms using AND/OR logic. Setting <code>ALARM(ErrorsAlarm) AND ALARM(ErrorRateAlarm)</code> ensures notification only fires when both conditions are true simultaneously — eliminating noisy single-error alerts during low traffic. A metric math alarm (D) can combine metrics mathematically but evaluates a single computed result, not the state of two independent alarms."
    },
    {
      "question": "A developer adds X-Ray tracing to a Lambda function and wants to search for traces from a specific customer in the X-Ray console. The customerId should be filterable. Which X-Ray SDK method should be used?",
      "options": [
        { "letter": "A", "text": "`put_metadata('customerId', customer_id)` — metadata is the searchable field in X-Ray." },
        { "letter": "B", "text": "`put_annotation('customerId', customer_id)` — annotations are indexed and filterable in X-Ray." },
        { "letter": "C", "text": "Log the customerId to CloudWatch — X-Ray will correlate it automatically." },
        { "letter": "D", "text": "Add customerId to the X-Ray sampling rule configuration." }
      ],
      "answer": "B",
      "explanation": "<strong>X-Ray Annotations</strong> are indexed key-value pairs that can be used to search and filter traces in the X-Ray console and API. <code>put_annotation('customerId', 'ABC123')</code> makes every trace with that annotation filterable with a query like <code>annotation.customerId = \"ABC123\"</code>. <strong>Metadata</strong> (A) is NOT indexed — it is visible within an individual trace's detail view but cannot be used to search across traces."
    },
    {
      "question": "A developer notices that a Lambda function's CloudWatch Log group is growing without bound and costing significant money. Logs older than 30 days are never needed for debugging. What should be configured?",
      "options": [
        { "letter": "A", "text": "Enable S3 Intelligent-Tiering on the CloudWatch Logs bucket." },
        { "letter": "B", "text": "Set a 30-day log retention policy on the Lambda function's CloudWatch Log group." },
        { "letter": "C", "text": "Enable CloudWatch Logs compression to reduce storage costs." },
        { "letter": "D", "text": "Move logs to CloudWatch Logs Insights which auto-expires old data." }
      ],
      "answer": "B",
      "explanation": "CloudWatch Log groups default to <strong>Never Expire</strong> retention. Setting a <strong>retention policy</strong> (e.g., 30 days) on the log group automatically deletes log events older than the specified period, immediately reducing storage costs. This is a free configuration change. CloudWatch Logs doesn't have a 'compression' feature (C), and Logs Insights (D) is a query service, not a storage tier."
    }
  ],

  "t43": [
    {
      "question": "An API Gateway + Lambda application serves real-time product catalog data. A CloudWatch dashboard shows 95% of requests return identical product list responses. Lambda invocations are very high, increasing cost. What is the MOST cost-effective optimization?",
      "options": [
        { "letter": "A", "text": "Increase Lambda memory to reduce per-invocation duration and cost." },
        { "letter": "B", "text": "Enable API Gateway response caching with an appropriate TTL for the product catalog endpoint." },
        { "letter": "C", "text": "Configure Provisioned Concurrency to reduce Lambda cold starts." },
        { "letter": "D", "text": "Move the product catalog data to DynamoDB with DAX." }
      ],
      "answer": "B",
      "explanation": "<strong>API Gateway caching</strong> stores the response for a configured TTL. Subsequent identical requests are served directly from the cache without invoking Lambda — eliminating Lambda costs for 95% of requests. This is the most direct optimization for identical repeated API responses. Provisioned Concurrency (C) reduces latency but increases cost. DAX (D) would speed up DynamoDB reads but Lambda would still be invoked."
    },
    {
      "question": "A Lambda function processes messages from an SQS queue. CloudWatch shows the `ApproximateAgeOfOldestMessage` metric is growing — messages are not being processed fast enough. The function currently processes one message at a time with a batch size of 1. What is the most effective change?",
      "options": [
        { "letter": "A", "text": "Increase the Lambda function's memory from 128 MB to 1024 MB." },
        { "letter": "B", "text": "Increase the SQS queue's visibility timeout." },
        { "letter": "C", "text": "Increase the Lambda event source mapping batch size (e.g., to 10 or higher) and ensure the function processes all items in the batch." },
        { "letter": "D", "text": "Enable Long Polling on the SQS queue." }
      ],
      "answer": "C",
      "explanation": "A <strong>larger batch size</strong> allows Lambda to process more messages per invocation, improving overall throughput without requiring more concurrent executions. With batch size 1, each message requires a separate Lambda invocation — inefficient. With batch size 10, one invocation handles 10 messages, multiplying effective throughput 10×. Increasing memory (A) helps if the function is CPU-bound, not throughput-bound. Long polling (D) reduces empty receives but doesn't help when messages are already piling up."
    },
    {
      "question": "A team is seeing high Lambda concurrency and throttling errors during traffic spikes. The account has a concurrency limit of 1,000 and three other critical functions also run in the same account. What is the recommended approach to protect those critical functions from being starved of concurrency?",
      "options": [
        { "letter": "A", "text": "Set Provisioned Concurrency on all critical functions." },
        { "letter": "B", "text": "Set Reserved Concurrency on the critical functions to guarantee them a portion of the account limit, even if other functions are throttled." },
        { "letter": "C", "text": "Request a Service Quotas increase to eliminate all throttling." },
        { "letter": "D", "text": "Move the critical functions to a separate AWS account with its own concurrency limit." }
      ],
      "answer": "B",
      "explanation": "<strong>Reserved Concurrency</strong> serves two purposes: it caps a function's maximum concurrency AND reserves that capacity from the account pool so other functions cannot consume it. By setting reserved concurrency on critical functions (e.g., reserve 200 for payment processing), those functions are guaranteed that capacity even if a non-critical function is consuming the rest of the account limit. This is the most operationally simple solution."
    },
    {
      "question": "An SNS topic fans out to 5 SQS queues. Only Queue 3 cares about `eventType = ORDER_SHIPPED` messages. Currently all 5 queues receive all event types, and Queue 3 discards 90% of messages it receives. How can this be optimized?",
      "options": [
        { "letter": "A", "text": "Create a separate SNS topic for ORDER_SHIPPED events and update publishers to send to the correct topic." },
        { "letter": "B", "text": "Add a subscription filter policy on Queue 3's SNS subscription to only deliver messages where `eventType = ORDER_SHIPPED`." },
        { "letter": "C", "text": "Enable SNS message deduplication to reduce duplicate deliveries to Queue 3." },
        { "letter": "D", "text": "Use a Lambda function subscribed to SNS to route messages to the correct SQS queue." }
      ],
      "answer": "B",
      "explanation": "<strong>SNS Subscription Filter Policies</strong> are the purpose-built solution. Attaching a filter policy <code>{\"eventType\": [\"ORDER_SHIPPED\"]}</code> to Queue 3's subscription tells SNS to only deliver matching messages. The filtering happens at SNS, before delivery — Queue 3 never receives the other 90% of messages, eliminating unnecessary processing and SQS charges. Creating a separate topic (A) requires publisher changes. A routing Lambda (D) adds cost and complexity."
    }
  ]

};
