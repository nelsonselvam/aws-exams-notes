window.mcqData = {
  "oe": [
    {
      "question": "A company wants to improve its operational practices. They currently deploy updates manually and have no automated testing pipeline. Which Well-Architected Operational Excellence design principle best describes what they should implement first?",
      "options": [
        {"letter": "A", "text": "Anticipate failure by performing pre-mortem exercises"},
        {"letter": "B", "text": "Perform operations as code using CloudFormation and CodePipeline"},
        {"letter": "C", "text": "Make frequent small reversible changes to reduce blast radius"},
        {"letter": "D", "text": "Refine operations procedures frequently through GameDays"}
      ],
      "answer": "B",
      "explanation": "The foundational Operational Excellence principle is 'Perform operations as code.' Automating infrastructure and deployments via IaC (CloudFormation, CDK) and CI/CD pipelines (CodePipeline/CodeBuild) eliminates manual error-prone steps. The other options are valid principles but build on top of a solid automation foundation."
    },
    {
      "question": "During a production incident, your team discovers they have no runbook for the failure scenario and each engineer is improvising their own fix. Which Operational Excellence best practice directly addresses this gap?",
      "options": [
        {"letter": "A", "text": "Implement health checks and dashboards with CloudWatch"},
        {"letter": "B", "text": "Create annotated runbooks and use Systems Manager Automation documents to encode procedures"},
        {"letter": "C", "text": "Enable AWS Config rules to detect configuration drift"},
        {"letter": "D", "text": "Use AWS Trusted Advisor to surface operational recommendations"}
      ],
      "answer": "B",
      "explanation": "Runbooks capture the knowledge needed to perform operations. AWS Systems Manager Automation documents (runbooks) encode these procedures as code, making them repeatable and shareable. CloudWatch (A) helps observe but doesn't provide the procedure. Config (C) detects drift but doesn't guide response."
    },
    {
      "question": "A team releases large feature bundles every quarter, causing difficult rollbacks when issues arise. Which Operational Excellence principle should they adopt?",
      "options": [
        {"letter": "A", "text": "Anticipate failure"},
        {"letter": "B", "text": "Learn from all operational failures"},
        {"letter": "C", "text": "Make frequent, small, reversible changes"},
        {"letter": "D", "text": "Refine operations procedures frequently"}
      ],
      "answer": "C",
      "explanation": "Making frequent, small, reversible changes (continuous delivery) reduces deployment risk and simplifies rollback. Smaller changes are easier to diagnose when they cause issues. This is a core Operational Excellence design principle."
    },
    {
      "question": "After a major outage, a company holds a blameless post-mortem and documents the root cause. AWS CodePipeline was not the failure point—the issue was an undocumented dependency. Which OE principle does this activity exemplify?",
      "options": [
        {"letter": "A", "text": "Perform operations as code"},
        {"letter": "B", "text": "Annotate documentation"},
        {"letter": "C", "text": "Learn from all operational failures"},
        {"letter": "D", "text": "Anticipate failure"}
      ],
      "answer": "C",
      "explanation": "'Learn from all operational failures' means conducting post-mortems after incidents to capture lessons and improve runbooks. The blameless culture and documentation update are exactly this principle in action."
    },
    {
      "question": "Which AWS service is MOST associated with implementing the Operational Excellence pillar practice of 'understanding workload health'?",
      "options": [
        {"letter": "A", "text": "AWS CloudTrail"},
        {"letter": "B", "text": "Amazon CloudWatch with dashboards and alarms"},
        {"letter": "C", "text": "AWS Config"},
        {"letter": "D", "text": "AWS Trusted Advisor"}
      ],
      "answer": "B",
      "explanation": "CloudWatch provides metrics, logs, alarms, and dashboards — the primary toolset for observing workload health in real time. CloudTrail (A) records API calls for audit. Config (C) tracks configuration compliance. Trusted Advisor (D) gives recommendations but is not a live health monitoring tool."
    },
    {
      "question": "A GameDay exercise is being planned for a new application. What is the PRIMARY purpose of this exercise from a Well-Architected Operational Excellence perspective?",
      "options": [
        {"letter": "A", "text": "Test disaster recovery RTO and RPO targets under real failure conditions"},
        {"letter": "B", "text": "Refine operations procedures and validate runbooks by simulating failure scenarios"},
        {"letter": "C", "text": "Identify cost optimization opportunities in the production environment"},
        {"letter": "D", "text": "Validate that the CI/CD pipeline correctly deploys new features"}
      ],
      "answer": "B",
      "explanation": "GameDays are simulated failure exercises whose purpose is to refine operational procedures, train teams on runbooks, and identify gaps before real failures occur. RTO/RPO testing (A) overlaps but is a Reliability concern. GameDays are explicitly called out under the OE 'refine operations procedures frequently' principle."
    }
  ],
  "sec": [
    {
      "question": "A security team needs to enforce that no S3 bucket in any AWS account in their organization is ever made public. They want this enforced even if individual account administrators try to override it. Which approach achieves this?",
      "options": [
        {"letter": "A", "text": "Apply an S3 bucket policy on each bucket denying public access"},
        {"letter": "B", "text": "Enable S3 Block Public Access at the account level using AWS Config"},
        {"letter": "C", "text": "Use an AWS Organizations Service Control Policy (SCP) to deny s3:PutBucketPublicAccessBlock with a deny-override"},
        {"letter": "D", "text": "Apply an SCP that denies s3:PutBucketAcl and enables S3 Block Public Access at the organization root OU"}
      ],
      "answer": "D",
      "explanation": "SCPs applied at the root OU override all member account permissions — even the account root user cannot violate them. Enforcing S3 Block Public Access via SCP at the organization root ensures no account can grant public access. Option A is per-bucket and requires manual effort. Option C uses incorrect API syntax and doesn't actually block all public access paths."
    },
    {
      "question": "Following the Security pillar principle of least privilege, a developer needs to give a Lambda function access to read from one specific DynamoDB table. Which is the BEST approach?",
      "options": [
        {"letter": "A", "text": "Attach the AWS managed policy AmazonDynamoDBFullAccess to the Lambda execution role"},
        {"letter": "B", "text": "Create an IAM role with a custom policy allowing only dynamodb:GetItem and dynamodb:Query on the specific table ARN, and assign it as the Lambda execution role"},
        {"letter": "C", "text": "Store DynamoDB credentials in environment variables and use them in the Lambda code"},
        {"letter": "D", "text": "Create an IAM user with DynamoDB read access and embed the access keys in the Lambda code"}
      ],
      "answer": "B",
      "explanation": "Least privilege means granting only the specific permissions needed on the specific resource. A custom IAM role with scoped permissions (specific actions + specific resource ARN) attached to the Lambda execution role is best practice. Full access policies (A) violate least privilege. Embedding credentials (C, D) is an anti-pattern and security risk."
    },
    {
      "question": "A company stores customer PII in S3 and needs to detect if any of it is accidentally exposed or accessed by unauthorized principals. Which AWS service combination BEST addresses this detective control requirement?",
      "options": [
        {"letter": "A", "text": "Enable AWS Config rules + AWS Trusted Advisor"},
        {"letter": "B", "text": "Enable Amazon Macie for PII detection and Amazon GuardDuty for threat detection"},
        {"letter": "C", "text": "Use CloudWatch Alarms on S3 GetObject metrics"},
        {"letter": "D", "text": "Enable S3 Server Access Logging and review logs weekly"}
      ],
      "answer": "B",
      "explanation": "Amazon Macie uses ML to automatically discover and classify PII in S3. Amazon GuardDuty analyzes CloudTrail, VPC Flow Logs, and DNS logs to detect anomalous access patterns. Together they provide detective controls for both data classification and threat detection — a direct Security pillar requirement."
    },
    {
      "question": "Which Well-Architected Security design principle is demonstrated by encrypting data at rest with AWS KMS and enforcing TLS for all data in transit?",
      "options": [
        {"letter": "A", "text": "Apply security at all layers"},
        {"letter": "B", "text": "Enable traceability"},
        {"letter": "C", "text": "Protect data in transit and at rest"},
        {"letter": "D", "text": "Automate security best practices"}
      ],
      "answer": "C",
      "explanation": "Encrypting data at rest (KMS) and enforcing TLS for data in transit directly implements the 'Protect data in transit and at rest' design principle. This is one of the seven Security pillar design principles focused on data protection."
    },
    {
      "question": "An organization wants to centrally collect and analyze security findings from GuardDuty, Macie, Inspector, and IAM Access Analyzer across all 50 AWS accounts in their organization. Which service is BEST suited for this?",
      "options": [
        {"letter": "A", "text": "AWS CloudTrail with CloudWatch Logs Insights"},
        {"letter": "B", "text": "AWS Security Hub with Organization-level aggregation"},
        {"letter": "C", "text": "AWS Config aggregator with custom rules"},
        {"letter": "D", "text": "Amazon Detective for cross-account investigation"}
      ],
      "answer": "B",
      "explanation": "AWS Security Hub is purpose-built to aggregate, normalize, and prioritize security findings from multiple AWS security services across accounts. It can be enabled at the organization level to collect findings from all member accounts. Config (C) handles compliance, not security finding aggregation. Detective (D) is for investigation after findings are identified."
    },
    {
      "question": "A company's security policy requires that all API calls to AWS services be logged, including who made them, from where, and what they did. Which service provides this?",
      "options": [
        {"letter": "A", "text": "Amazon CloudWatch Metrics"},
        {"letter": "B", "text": "AWS CloudTrail"},
        {"letter": "C", "text": "AWS Config"},
        {"letter": "D", "text": "VPC Flow Logs"}
      ],
      "answer": "B",
      "explanation": "AWS CloudTrail records all AWS API calls — the caller identity, source IP, service, action, and resources affected. This is the primary 'enable traceability' mechanism for the Security pillar. CloudWatch (A) captures metrics and logs but not API-level audit trails. Config (C) records configuration state changes. VPC Flow Logs (D) captures network traffic metadata."
    },
    {
      "question": "The Security pillar principle 'Apply security at all layers' is BEST exemplified by which combination?",
      "options": [
        {"letter": "A", "text": "IAM policies only, since AWS handles the underlying infrastructure security"},
        {"letter": "B", "text": "VPC security groups + NACLs + WAF + IAM + KMS encryption + GuardDuty"},
        {"letter": "C", "text": "S3 bucket policies + CloudTrail logging"},
        {"letter": "D", "text": "AWS Shield Standard + CloudFront for all public endpoints"}
      ],
      "answer": "B",
      "explanation": "'Apply security at all layers' means implementing defense-in-depth: network layer (VPC, SGs, NACLs), edge (WAF, Shield), compute (IAM, instance roles), data (KMS), and detective (GuardDuty). Relying on a single control (A, C, D) violates the defense-in-depth intent of this principle."
    }
  ],
  "rel": [
    {
      "question": "A critical application's RTO is 1 hour and RPO is 15 minutes. The current Backup and Restore DR strategy cannot meet these targets. Which DR strategy should they move to?",
      "options": [
        {"letter": "A", "text": "Pilot Light — replicate core data but keep non-core infrastructure off"},
        {"letter": "B", "text": "Warm Standby — run a scaled-down version of the full system"},
        {"letter": "C", "text": "Multi-Site Active-Active — run full capacity in multiple regions simultaneously"},
        {"letter": "D", "text": "Backup and Restore with increased backup frequency"}
      ],
      "answer": "B",
      "explanation": "Warm Standby maintains a scaled-down but fully functional replica that can be quickly scaled up, typically achieving RTO of minutes and RPO of seconds to minutes. Pilot Light (A) keeps only core data/DB replicated and requires more time to provision the full stack. Multi-Site (C) achieves near-zero RTO/RPO but at much higher cost. Increasing backup frequency (D) doesn't address RTO."
    },
    {
      "question": "A web application uses a single RDS instance. To improve reliability per the Well-Architected Framework, which change should be prioritized?",
      "options": [
        {"letter": "A", "text": "Enable RDS Multi-AZ deployment for automatic failover"},
        {"letter": "B", "text": "Increase the RDS instance size to handle more load"},
        {"letter": "C", "text": "Add a Read Replica in the same Availability Zone"},
        {"letter": "D", "text": "Enable automated backups with 7-day retention"}
      ],
      "answer": "A",
      "explanation": "Multi-AZ creates a synchronous standby replica in a different AZ with automatic failover, directly addressing the single point of failure. Read Replicas (C) improve read scaling but are asynchronous and not designed for automatic failover of write traffic. Automated backups (D) reduce RPO but not RTO. Increasing instance size (B) is a performance, not reliability, change."
    },
    {
      "question": "Which Reliability design principle does Amazon Route 53 health checks with DNS failover MOST directly implement?",
      "options": [
        {"letter": "A", "text": "Test recovery procedures"},
        {"letter": "B", "text": "Automatically recover from failure"},
        {"letter": "C", "text": "Scale horizontally to increase aggregate system availability"},
        {"letter": "D", "text": "Stop guessing capacity"}
      ],
      "answer": "B",
      "explanation": "'Automatically recover from failure' means monitoring for key performance indicators (KPIs) and triggering automated recovery without human intervention. Route 53 health checks detect endpoint failures and automatically shift DNS to healthy endpoints — this is automated recovery. Manual failover procedures would map to 'test recovery procedures' (A)."
    },
    {
      "question": "An architecture passes all unit tests but fails under production load. The team has never tested failover procedures. Which Reliability principle are they violating?",
      "options": [
        {"letter": "A", "text": "Stop guessing capacity"},
        {"letter": "B", "text": "Manage change in automation"},
        {"letter": "C", "text": "Test recovery procedures"},
        {"letter": "D", "text": "Scale horizontally"}
      ],
      "answer": "C",
      "explanation": "'Test recovery procedures' means validating that failure recovery actually works before a real failure — using chaos engineering tools like AWS Fault Injection Simulator (FIS). Untested failover is one of the most common reliability failures in production systems."
    },
    {
      "question": "A microservices architecture has a service that calls 5 downstream dependencies. If any one fails, the entire request chain fails. Which reliability pattern should be implemented?",
      "options": [
        {"letter": "A", "text": "Enable X-Ray tracing on all services"},
        {"letter": "B", "text": "Implement circuit breakers and bulkhead patterns to isolate failures"},
        {"letter": "C", "text": "Increase Lambda concurrency limits for all services"},
        {"letter": "D", "text": "Move all services to a single monolithic deployment"}
      ],
      "answer": "B",
      "explanation": "Circuit breakers prevent cascading failures by stopping calls to failing services and allowing them to recover. Bulkheads isolate resource pools so one overloaded dependency can't exhaust resources for others. Both are key Reliability pillar reliability patterns. X-Ray (A) provides observability but doesn't prevent cascading failures."
    },
    {
      "question": "An application running on EC2 needs to be highly available across multiple Availability Zones. Which architecture pattern BEST achieves this per the Reliability pillar?",
      "options": [
        {"letter": "A", "text": "Two large EC2 instances in the same AZ with one as hot standby"},
        {"letter": "B", "text": "Auto Scaling group spanning multiple AZs behind an Application Load Balancer"},
        {"letter": "C", "text": "A single large instance with enhanced networking enabled"},
        {"letter": "D", "text": "EC2 instances with EBS volumes replicated using AWS DataSync"}
      ],
      "answer": "B",
      "explanation": "An ASG spanning multiple AZs with an ALB implements 'scale horizontally' and 'use multiple Availability Zones' — core Reliability patterns. The ASG automatically replaces unhealthy instances and the ALB distributes traffic only to healthy targets. Single-AZ deployments (A, C) cannot survive an AZ failure."
    }
  ],
  "perf": [
    {
      "question": "An e-commerce application's database is experiencing high read latency during peak traffic. The database holds product catalog data that changes infrequently. Which Performance Efficiency approach best addresses this?",
      "options": [
        {"letter": "A", "text": "Upgrade the RDS instance to a larger instance type"},
        {"letter": "B", "text": "Add an Amazon ElastiCache (Redis) layer to cache frequently read product data"},
        {"letter": "C", "text": "Enable Multi-AZ on the RDS instance"},
        {"letter": "D", "text": "Increase RDS max_connections parameter"}
      ],
      "answer": "B",
      "explanation": "ElastiCache (Redis) caches frequently accessed, rarely-changing data in-memory, dramatically reducing database read load and latency. This is the 'use caching' performance pattern. Upgrading instance size (A) is vertical scaling and more expensive. Multi-AZ (C) improves availability, not read performance. Increasing connections (D) doesn't reduce query latency."
    },
    {
      "question": "A global application currently deployed only in us-east-1 has users in Europe and Asia Pacific experiencing high latency. Which Performance Efficiency solution should be implemented?",
      "options": [
        {"letter": "A", "text": "Increase EC2 instance sizes in us-east-1"},
        {"letter": "B", "text": "Use Amazon CloudFront with edge locations to cache static content closer to users"},
        {"letter": "C", "text": "Enable Enhanced Networking on EC2 instances"},
        {"letter": "D", "text": "Use larger EBS volumes with higher IOPS"}
      ],
      "answer": "B",
      "explanation": "CloudFront's global edge network caches content close to end users, reducing round-trip latency from hundreds of ms to single-digit ms. This implements the 'go global in minutes' Performance Efficiency principle. For dynamic content, Route 53 latency routing + multi-region deployment would also help. Local instance scaling (A, C, D) doesn't help distant users."
    },
    {
      "question": "Which Performance Efficiency design principle does AWS Auto Scaling implement when it dynamically adjusts EC2 capacity based on CloudWatch metrics?",
      "options": [
        {"letter": "A", "text": "Democratize advanced technologies"},
        {"letter": "B", "text": "Go global in minutes"},
        {"letter": "C", "text": "Use serverless architectures"},
        {"letter": "D", "text": "Stop guessing capacity"}
      ],
      "answer": "D",
      "explanation": "'Stop guessing capacity' means using Auto Scaling to dynamically provision resources based on actual demand rather than over-provisioning. AWS Auto Scaling with CloudWatch metrics directly implements this principle by continuously right-sizing capacity."
    },
    {
      "question": "A data processing job processes 10 GB files sequentially, taking 8 hours. Which performance approach should be evaluated first per the Performance Efficiency pillar?",
      "options": [
        {"letter": "A", "text": "Move to a larger EC2 instance with more CPU and RAM"},
        {"letter": "B", "text": "Partition the workload and process chunks in parallel using multiple instances or Lambda"},
        {"letter": "C", "text": "Use Provisioned IOPS SSD for faster disk I/O"},
        {"letter": "D", "text": "Enable EC2 placement groups for lower network latency"}
      ],
      "answer": "B",
      "explanation": "The Performance Efficiency pillar emphasizes parallelization — dividing work into smaller pieces that can be processed concurrently. S3 + Lambda/Step Functions for parallel chunk processing or EMR for distributed processing can reduce 8-hour jobs to minutes. Vertical scaling (A) has diminishing returns and costs more."
    },
    {
      "question": "Which AWS service pair BEST supports the Performance Efficiency principle of 'use the right tool for the job' for a workload that needs both sub-millisecond key-value lookups and complex SQL queries?",
      "options": [
        {"letter": "A", "text": "RDS MySQL for both use cases with read replicas"},
        {"letter": "B", "text": "DynamoDB for key-value access + Amazon Aurora for complex SQL queries"},
        {"letter": "C", "text": "ElastiCache for both use cases with different cache clusters"},
        {"letter": "D", "text": "Amazon Redshift for both OLTP and analytical queries"}
      ],
      "answer": "B",
      "explanation": "'Use the right tool for the job' means selecting purpose-built databases. DynamoDB provides single-digit millisecond key-value lookups at any scale. Aurora provides MySQL/PostgreSQL-compatible SQL with superior performance to standard RDS. Using RDS for everything (A) forces trade-offs; Redshift (D) is OLAP-optimized and poor for OLTP."
    },
    {
      "question": "An application uses EC2 with general purpose SSDs. A performance review shows the bottleneck is disk I/O for a transactional database. Which change aligns with the Performance Efficiency pillar?",
      "options": [
        {"letter": "A", "text": "Enable EC2 Enhanced Networking"},
        {"letter": "B", "text": "Migrate to EBS Provisioned IOPS (io2) or consider Amazon RDS/Aurora which manages storage automatically"},
        {"letter": "C", "text": "Add more EC2 instances behind a load balancer"},
        {"letter": "D", "text": "Enable CloudWatch detailed monitoring"}
      ],
      "answer": "B",
      "explanation": "When the bottleneck is disk I/O, moving to Provisioned IOPS EBS volumes (io2) guarantees consistent IOPS performance. For managed databases, Aurora uses distributed storage that auto-scales and is optimized for database workloads. Enhanced Networking (A) addresses network, not disk. Adding instances (C) doesn't fix a single-node I/O bottleneck."
    }
  ],
  "cost": [
    {
      "question": "A company's EC2 fleet runs a production workload 24/7 for the past two years and is expected to continue for at least two more years. Which pricing model offers the GREATEST cost savings?",
      "options": [
        {"letter": "A", "text": "On-Demand Instances"},
        {"letter": "B", "text": "1-year Standard Reserved Instances with partial upfront payment"},
        {"letter": "C", "text": "3-year Standard Reserved Instances with all-upfront payment"},
        {"letter": "D", "text": "Spot Instances"}
      ],
      "answer": "C",
      "explanation": "For stable, predictable 24/7 workloads with a 2+ year commitment, 3-year Standard Reserved Instances with all-upfront payment provide the maximum discount (~72% vs On-Demand). Spot Instances (D) offer the deepest discounts but can be interrupted. 1-year RIs (B) offer less savings than 3-year."
    },
    {
      "question": "A company wants to reduce EC2 costs for batch processing workloads that can be interrupted and restarted. The jobs run for 2–6 hours and must complete within 24 hours. Which pricing model is MOST appropriate?",
      "options": [
        {"letter": "A", "text": "On-Demand Instances"},
        {"letter": "B", "text": "Reserved Instances"},
        {"letter": "C", "text": "Spot Instances with checkpointing to S3"},
        {"letter": "D", "text": "Dedicated Hosts"}
      ],
      "answer": "C",
      "explanation": "Spot Instances offer up to 90% savings vs On-Demand and are ideal for fault-tolerant, interruptible batch workloads. Checkpointing progress to S3 ensures work isn't lost on interruption. Reserved Instances (B) require commitment and are better for steady-state. Dedicated Hosts (D) are the most expensive."
    },
    {
      "question": "A startup's AWS bill has grown significantly. Which Cost Optimization design principle should they implement FIRST to understand where costs are being incurred?",
      "options": [
        {"letter": "A", "text": "Implement cloud financial management using Cost Explorer and tagging"},
        {"letter": "B", "text": "Delete all unused resources immediately"},
        {"letter": "C", "text": "Move all workloads to Spot Instances"},
        {"letter": "D", "text": "Purchase Savings Plans for all services"}
      ],
      "answer": "A",
      "explanation": "The first Cost Optimization principle is 'Implement cloud financial management' — you can't optimize what you can't measure. AWS Cost Explorer with resource tagging provides visibility into cost attribution by team, project, and environment. Deleting resources (B) without analysis could remove needed assets. Savings Plans (D) should be sized based on actual usage data."
    },
    {
      "question": "An organization pays for EC2 instances that their development team leaves running overnight and on weekends. Which Cost Optimization approach is MOST effective?",
      "options": [
        {"letter": "A", "text": "Purchase Reserved Instances for the dev instances"},
        {"letter": "B", "text": "Use AWS Instance Scheduler or Lambda to start/stop dev instances on a schedule"},
        {"letter": "C", "text": "Move dev instances to Spot Instances"},
        {"letter": "D", "text": "Enable EC2 Auto Scaling for dev instances"}
      ],
      "answer": "B",
      "explanation": "'Match supply to demand' and 'manage demand and supply resources' — scheduling dev environments to be off during non-business hours can reduce EC2 costs by 65%+ (16 hours/day × 8 days/weekend). Instance Scheduler (AWS solution) or a Lambda-based cron automates this. Spot (C) reduces per-hour cost but doesn't eliminate the hours when instances are unneeded."
    },
    {
      "question": "A company stores 50 TB of log files in S3 Standard. Logs older than 30 days are rarely accessed; logs older than 1 year are never accessed but must be retained for 7 years for compliance. Which S3 lifecycle configuration is MOST cost-effective?",
      "options": [
        {"letter": "A", "text": "Keep all logs in S3 Standard"},
        {"letter": "B", "text": "Move to S3 Standard-IA at 30 days, then S3 Glacier Flexible Retrieval at 90 days, delete at 7 years"},
        {"letter": "C", "text": "Move to S3 Standard-IA at 30 days, then S3 Glacier Deep Archive at 365 days, delete at 7 years"},
        {"letter": "D", "text": "Delete all logs older than 30 days"}
      ],
      "answer": "C",
      "explanation": "S3 Glacier Deep Archive is the lowest-cost S3 storage class (~$0.00099/GB/month) and is designed for data accessed once or twice a year. Moving rarely-accessed logs to Standard-IA at 30 days and then to Glacier Deep Archive at 365 days minimizes costs while meeting 7-year compliance retention. Option D violates the compliance requirement."
    },
    {
      "question": "Which AWS Cost Optimization principle does using AWS Lambda instead of 24/7 EC2 instances for event-driven, variable workloads BEST exemplify?",
      "options": [
        {"letter": "A", "text": "Implement cloud financial management"},
        {"letter": "B", "text": "Adopt a consumption model (pay for only what you use)"},
        {"letter": "C", "text": "Measure overall efficiency"},
        {"letter": "D", "text": "Stop spending money on undifferentiated heavy lifting"}
      ],
      "answer": "B",
      "explanation": "Lambda charges per invocation and per GB-second of execution — you pay only for actual compute consumed. This is the 'adopt a consumption model' principle: aligning costs directly to usage rather than paying for idle EC2 capacity. This is a foundational cost optimization shift enabled by serverless architectures."
    },
    {
      "question": "AWS Compute Savings Plans vs EC2 Instance Savings Plans: A company has a mixed EC2 fleet across multiple instance families and wants flexibility to change instance types. Which Savings Plan type is MORE appropriate?",
      "options": [
        {"letter": "A", "text": "EC2 Instance Savings Plans — they offer higher discounts"},
        {"letter": "B", "text": "Compute Savings Plans — they apply to any EC2 instance, Lambda, and Fargate, regardless of family or region"},
        {"letter": "C", "text": "Standard Reserved Instances — they offer the deepest discounts"},
        {"letter": "D", "text": "No commitment purchase — maintain flexibility with On-Demand"}
      ],
      "answer": "B",
      "explanation": "Compute Savings Plans apply to any EC2 instance family, size, AZ, region, OS, and also to Lambda and Fargate. They offer ~66% savings with maximum flexibility. EC2 Instance Savings Plans (A) offer higher discounts (~72%) but are locked to a specific instance family and region. For a diverse fleet with evolving needs, Compute Savings Plans win on flexibility."
    }
  ],
  "sus": [
    {
      "question": "A company wants to reduce the carbon footprint of their AWS workloads. Which Sustainability design principle does choosing a region with a higher percentage of renewable energy directly implement?",
      "options": [
        {"letter": "A", "text": "Understand your impact"},
        {"letter": "B", "text": "Establish sustainability goals"},
        {"letter": "C", "text": "Maximize utilization"},
        {"letter": "D", "text": "Use managed services"}
      ],
      "answer": "A",
      "explanation": "Choosing regions with renewable energy requires first understanding the carbon intensity impact of your region choice — this is 'understand your impact.' AWS provides the Customer Carbon Footprint Tool and region-specific sustainability data to support this. Establishing goals (B) is a broader governance activity; this specific action is about measurement and understanding."
    },
    {
      "question": "An organization's batch jobs run on EC2 instances that are 20% utilized on average. From a Sustainability perspective, what should they do?",
      "options": [
        {"letter": "A", "text": "Purchase more Reserved Instances to reduce cost"},
        {"letter": "B", "text": "Right-size instances and use Spot Instances to improve utilization; consider moving to Lambda or AWS Batch"},
        {"letter": "C", "text": "Add more instances to parallelize the work faster"},
        {"letter": "D", "text": "Enable detailed CloudWatch monitoring"}
      ],
      "answer": "B",
      "explanation": "'Maximize utilization' is a core Sustainability principle — low utilization (20%) means 80% of provisioned resources are idle and consuming energy without delivering value. Right-sizing, using Spot, or moving to serverless (Lambda/Batch) eliminates that waste. Adding more instances (C) would worsen utilization."
    },
    {
      "question": "Which AWS service helps teams directly measure the carbon footprint of their AWS usage to support the Sustainability pillar principle of 'understand your impact'?",
      "options": [
        {"letter": "A", "text": "AWS Cost Explorer"},
        {"letter": "B", "text": "AWS Customer Carbon Footprint Tool"},
        {"letter": "C", "text": "AWS Trusted Advisor"},
        {"letter": "D", "text": "Amazon CloudWatch with custom metrics"}
      ],
      "answer": "B",
      "explanation": "The AWS Customer Carbon Footprint Tool provides estimated carbon emissions for your AWS usage, broken down by service and region. This is the direct tool for 'understand your impact.' Cost Explorer (A) shows cost not carbon. Trusted Advisor (C) gives optimization recommendations but not carbon data."
    },
    {
      "question": "A team stores user-uploaded images and always processes them immediately on upload regardless of whether the user is active. Which Sustainability improvement should they consider?",
      "options": [
        {"letter": "A", "text": "Use larger EC2 instances for faster processing"},
        {"letter": "B", "text": "Batch and defer processing to off-peak hours using SQS + scheduled Lambda, reducing resource spikes"},
        {"letter": "C", "text": "Enable Auto Scaling so processing capacity always matches upload rate"},
        {"letter": "D", "text": "Move image storage to S3 Glacier to reduce storage energy"}
      ],
      "answer": "B",
      "explanation": "'Anticipate and adopt new, more efficient hardware and software offerings' and 'optimize your impact' include shifting non-time-sensitive work to off-peak periods when shared infrastructure has spare capacity. SQS + scheduled Lambda for batch processing reduces peak resource consumption. This is a practical Sustainability pattern for workloads without strict latency SLAs."
    },
    {
      "question": "The Sustainability pillar principle 'use managed services' is BEST justified by which reason?",
      "options": [
        {"letter": "A", "text": "Managed services are always cheaper than self-managed alternatives"},
        {"letter": "B", "text": "AWS can achieve higher utilization across shared infrastructure than individual tenants, reducing per-customer energy use"},
        {"letter": "C", "text": "Managed services eliminate the need for Auto Scaling"},
        {"letter": "D", "text": "Managed services use dedicated hardware for better performance"}
      ],
      "answer": "B",
      "explanation": "AWS achieves economies of scale in sustainability by running shared infrastructure at much higher utilization levels (60–80%) than typical on-premises deployments (~15%). Moving to managed services (RDS, Lambda, ECS) lets AWS optimize resource sharing, reducing the energy and hardware footprint per customer workload."
    },
    {
      "question": "A company wants to align their cloud architecture improvements with the Sustainability pillar. Which combination of AWS tools supports ongoing monitoring and improvement of sustainability goals?",
      "options": [
        {"letter": "A", "text": "AWS Cost Explorer + AWS Budgets"},
        {"letter": "B", "text": "AWS Customer Carbon Footprint Tool + AWS Compute Optimizer + AWS Trusted Advisor"},
        {"letter": "C", "text": "Amazon CloudWatch + AWS X-Ray"},
        {"letter": "D", "text": "AWS Config + AWS Security Hub"}
      ],
      "answer": "B",
      "explanation": "The Sustainability toolset: Customer Carbon Footprint Tool measures emissions, Compute Optimizer recommends right-sizing to eliminate waste, and Trusted Advisor identifies idle/underutilized resources. Together they cover measure → optimize → verify. Cost tools (A) track spend, not sustainability. CloudWatch/X-Ray (C) are observability tools."
    }
  ]
};
