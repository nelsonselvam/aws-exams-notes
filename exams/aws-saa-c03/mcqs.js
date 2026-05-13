window.mcqData = {
  "t11": [
    {
      "question": "A company uses AWS Organizations and has an SCP attached to the production OU that contains an explicit Deny for all `ec2:DeleteVolume` actions. An IAM User in a production account has an identity-based policy that explicitly Allows `ec2:*`. If the user attempts to delete an EBS volume, what will happen and why?",
      "options": [
        {
          "letter": "A",
          "text": "The action is allowed because the identity-based policy has a broader scope."
        },
        {
          "letter": "B",
          "text": "The action is denied because SCPs always override identity-based policies."
        },
        {
          "letter": "C",
          "text": "The action is allowed because explicit allows take precedence over explicit denies."
        },
        {
          "letter": "D",
          "text": "The action is denied because IAM users cannot delete EBS volumes without root access."
        }
      ],
      "answer": "B",
      "explanation": "In AWS policy evaluation, an explicit Deny at any level always wins. However, more specifically, SCPs act as a <strong>ceiling</strong> (guardrail) for permissions. Even if an IAM policy explicitly allows an action, if an SCP denies it, the action is denied. This is the <strong>PIRATES</strong> mnemonic in action\u2014Explicit deny Supersedes."
    },
    {
      "question": "A developer needs an EC2 instance to upload log files to an S3 bucket securely. What is the most secure and operationally efficient way to grant this access?",
      "options": [
        {
          "letter": "A",
          "text": "Generate an IAM user's access keys and embed them in the application code."
        },
        {
          "letter": "B",
          "text": "Store IAM access keys in a hidden file on the EC2 instance's EBS volume."
        },
        {
          "letter": "C",
          "text": "Create an IAM Role with an attached policy allowing S3 upload, and attach the role to the EC2 instance via an Instance Profile."
        },
        {
          "letter": "D",
          "text": "Create a bucket policy granting public write access, but restrict it via a VPC endpoint condition."
        }
      ],
      "answer": "C",
      "explanation": "You should never store long-term access keys on an EC2 instance. Using an IAM Role attached via an Instance Profile allows the AWS SDKs on the instance to automatically retrieve and rotate temporary credentials from the Instance Metadata Service (IMDS). This follows the principle of least privilege and eliminates credential leakage risk."
    },
    {
      "question": "A company is migrating its workforce to AWS. They have 2,000 employees managed in an on-premises Microsoft Active Directory. They want employees to log into the AWS Management Console using their existing AD credentials. Which solution requires the LEAST operational overhead?",
      "options": [
        {
          "letter": "A",
          "text": "Create 2,000 IAM users and manually sync their passwords via a daily script."
        },
        {
          "letter": "B",
          "text": "Use AWS Directory Service to create a new Managed Microsoft AD and migrate users."
        },
        {
          "letter": "C",
          "text": "Use Amazon Cognito User Pools and configure the AD as a SAML identity provider."
        },
        {
          "letter": "D",
          "text": "Use IAM Identity Center (AWS SSO) and configure it to connect to the on-premises Active Directory."
        }
      ],
      "answer": "D",
      "explanation": "<strong>IAM Identity Center</strong> is the recommended solution for <strong>workforce</strong> authentication and multi-account access. It natively integrates with on-premises Active Directory, allowing users to assume roles via SSO. Cognito is for customer-facing apps, and creating 2,000 IAM users is an anti-pattern."
    },
    {
      "question": "According to the AWS Shared Responsibility Model, which of the following is solely the responsibility of the customer?",
      "options": [
        {
          "letter": "A",
          "text": "Maintaining the hypervisor that runs Amazon EC2 instances."
        },
        {
          "letter": "B",
          "text": "Ensuring data stored in Amazon S3 is encrypted."
        },
        {
          "letter": "C",
          "text": "Patching the operating system of an Amazon RDS database."
        },
        {
          "letter": "D",
          "text": "Managing the physical security of edge locations."
        }
      ],
      "answer": "B",
      "explanation": "Customers are responsible for Security <strong>IN</strong> the Cloud (Data, IAM, Configuration). AWS is responsible for Security <strong>OF</strong> the Cloud (Hardware, Infrastructure, Managed Service OS). RDS is a managed service, so AWS patches its OS. However, encrypting data and configuring access controls in S3 is entirely your responsibility."
    },
    {
      "question": "A startup has just created its new AWS account. What is the immediate first step the administrator should take to secure the root user?",
      "options": [
        {
          "letter": "A",
          "text": "Delete the root user account to prevent unauthorized access."
        },
        {
          "letter": "B",
          "text": "Enable hardware MFA on the root user and store the token in a secure location."
        },
        {
          "letter": "C",
          "text": "Create programmatic access keys for the root user to automate infrastructure deployment."
        },
        {
          "letter": "D",
          "text": "Assign the AdministratorAccess policy directly to the root user."
        }
      ],
      "answer": "B",
      "explanation": "The root user cannot be deleted and it inherently has full access to everything. You should never generate access keys for the root user. The immediate best practice is to lock it down using strong Multi-Factor Authentication (MFA), preferably hardware FIDO/TOTP, and then use IAM users/roles for daily operations."
    },
    {
      "question": "An administrator needs to enforce that no EC2 instances can be launched outside of the `us-east-1` and `eu-west-1` regions across all 50 AWS accounts in the organization. How can this be achieved centrally?",
      "options": [
        {
          "letter": "A",
          "text": "Create an IAM policy with a `aws:RequestedRegion` condition and attach it to an IAM Group in every account."
        },
        {
          "letter": "B",
          "text": "Use AWS Config rules to terminate non-compliant instances in other regions automatically."
        },
        {
          "letter": "C",
          "text": "Create a Service Control Policy (SCP) at the root of AWS Organizations denying actions outside the specified regions."
        },
        {
          "letter": "D",
          "text": "Use AWS CloudTrail to monitor regional launches and trigger a Lambda function to stop them."
        }
      ],
      "answer": "C",
      "explanation": "SCPs are used to set central guardrails across an entire AWS Organization. By applying a region-restriction SCP at the root or OU level, you ensure that no user or role (even those with AdministratorAccess in member accounts) can provision resources in unauthorized regions. IAM policies would require manual distribution to 50 accounts."
    },
    {
      "question": "Which of the following actions can ONLY be performed by the AWS account Root User?",
      "options": [
        {
          "letter": "A",
          "text": "Attaching an AdministratorAccess policy to an IAM role."
        },
        {
          "letter": "B",
          "text": "Changing the AWS Support plan."
        },
        {
          "letter": "C",
          "text": "Modifying a Service Control Policy in AWS Organizations."
        },
        {
          "letter": "D",
          "text": "Deleting a KMS Customer Managed Key."
        }
      ],
      "answer": "B",
      "explanation": "Remember the <strong>MACS</strong> mnemonic: <strong>M</strong>FA Delete, <strong>A</strong>ccount closing, <strong>C</strong>hange support plan, <strong>S</strong>ign up for GovCloud. These tasks strictly require root user login. Everything else (IAM, KMS, SCPs) can be done by an IAM principal with appropriate permissions."
    },
    {
      "question": "A web application allows users to upload profile pictures to an S3 bucket. The frontend application authenticates users via Google (social login). The application then needs to upload the picture directly to S3. How should the application obtain the necessary permissions?",
      "options": [
        {
          "letter": "A",
          "text": "Pass the Google OAuth token directly to S3 in the authorization header."
        },
        {
          "letter": "B",
          "text": "Use Amazon Cognito Identity Pools to exchange the Google token for temporary AWS STS credentials."
        },
        {
          "letter": "C",
          "text": "Use Amazon Cognito User Pools to generate an access token, which inherently has S3 write permissions."
        },
        {
          "letter": "D",
          "text": "Embed an IAM user access key in the frontend code that only has `s3:PutObject` permissions."
        }
      ],
      "answer": "B",
      "explanation": "Cognito Identity Pools (Federated Identities) act as an authorization broker. They take a token from an IdP (like Google or a Cognito User Pool) and exchange it for temporary, scoped AWS credentials via STS. S3 cannot parse Google tokens directly, and User Pool tokens only authenticate the user; they don't grant AWS IAM permissions."
    },
    {
      "question": "A Data Science team in Account A needs to read data from a centralized S3 bucket located in Account B. Both accounts are in the same AWS Organization. What is the most secure way to establish this cross-account access?",
      "options": [
        {
          "letter": "A",
          "text": "Set the S3 bucket in Account B to public read and restrict it to Account A's VPC."
        },
        {
          "letter": "B",
          "text": "Create an IAM Role in Account B granting S3 read access, and configure its trust policy to allow Account A to assume it."
        },
        {
          "letter": "C",
          "text": "Create an IAM user in Account B, generate access keys, and give them to the Data Science team in Account A."
        },
        {
          "letter": "D",
          "text": "Use AWS Organizations to share the bucket directly with Account A via an SCP."
        }
      ],
      "answer": "B",
      "explanation": "Cross-account access is best achieved using IAM Roles and `sts:AssumeRole`. Account B creates a role with a trust policy identifying Account A as a trusted principal. Users in Account A assume the role to get temporary credentials. This prevents the sharing of long-term access keys."
    },
    {
      "question": "What is a key difference between an IAM Role and an IAM User?",
      "options": [
        {
          "letter": "A",
          "text": "IAM Users use temporary credentials, while IAM Roles use long-term static credentials."
        },
        {
          "letter": "B",
          "text": "IAM Roles can be attached to EC2 instances, while IAM Users cannot."
        },
        {
          "letter": "C",
          "text": "IAM Roles can be placed into IAM Groups, but IAM Users cannot."
        },
        {
          "letter": "D",
          "text": "IAM Users are regional, while IAM Roles are global."
        }
      ],
      "answer": "B",
      "explanation": "IAM Roles are intended to be assumed and provide temporary credentials. They can be attached to compute resources like EC2 (via Instance Profiles) or Lambda. IAM Users represent physical people or long-term applications and have static credentials (passwords, access keys). Both are global resources. Roles cannot be placed in Groups."
    },
    {
      "question": "An enterprise has 150 AWS accounts. They want a standardized, automated way to provision new accounts with security guardrails (SCPs and AWS Config rules) already applied. Which AWS service provides this functionality?",
      "options": [
        {
          "letter": "A",
          "text": "AWS CloudFormation StackSets"
        },
        {
          "letter": "B",
          "text": "AWS Systems Manager"
        },
        {
          "letter": "C",
          "text": "AWS Control Tower"
        },
        {
          "letter": "D",
          "text": "AWS Identity and Access Management (IAM)"
        }
      ],
      "answer": "C",
      "explanation": "AWS Control Tower is built specifically for this. It sets up a \"Landing Zone\" using AWS Organizations and provides an \"Account Factory\" to vend new accounts that automatically have centralized logging, security guardrails (SCPs), and detective controls (Config rules) deployed from day one."
    },
    {
      "question": "You have applied a Permissions Boundary to an IAM Developer User. The boundary allows only S3 and EC2 actions. The user's attached IAM policy allows S3, EC2, and RDS actions. If the user tries to create an RDS database, what will be the result?",
      "options": [
        {
          "letter": "A",
          "text": "The action is allowed because the identity policy allows it."
        },
        {
          "letter": "B",
          "text": "The action is denied because the Permissions Boundary does not explicitly allow RDS."
        },
        {
          "letter": "C",
          "text": "The action is allowed because Permissions Boundaries only log out-of-bounds actions; they don't block them."
        },
        {
          "letter": "D",
          "text": "The action is denied because RDS requires a separate Service Linked Role."
        }
      ],
      "answer": "B",
      "explanation": "A Permissions Boundary defines the MAXIMUM permissions an entity can have. For an action to be allowed, it must be explicitly allowed by BOTH the identity policy AND the permissions boundary. Since the boundary only allows S3 and EC2, the RDS action is implicitly denied, regardless of the identity policy."
    },
    {
      "question": "An application needs temporary access to AWS resources. Which AWS STS API call should be used if the application is authenticating users via a corporate SAML 2.0 Identity Provider (IdP)?",
      "options": [
        {
          "letter": "A",
          "text": "sts:AssumeRole"
        },
        {
          "letter": "B",
          "text": "sts:AssumeRoleWithWebIdentity"
        },
        {
          "letter": "C",
          "text": "sts:AssumeRoleWithSAML"
        },
        {
          "letter": "D",
          "text": "sts:GetSessionToken"
        }
      ],
      "answer": "C",
      "explanation": "When federating with an enterprise IdP via SAML (like ADFS or Okta), the `AssumeRoleWithSAML` API is used to exchange the SAML assertion for temporary AWS credentials. `AssumeRoleWithWebIdentity` is used for OIDC/OAuth providers (like Google or Cognito)."
    },
    {
      "question": "A developer left the company, and you need to ensure their IAM User access keys are no longer usable. What is the best practice for revoking this access?",
      "options": [
        {
          "letter": "A",
          "text": "Delete the IAM user entirely immediately."
        },
        {
          "letter": "B",
          "text": "Make the access keys inactive in the IAM console, verify no production apps break, then delete them."
        },
        {
          "letter": "C",
          "text": "Change the password for the IAM User."
        },
        {
          "letter": "D",
          "text": "Attach an inline policy to the user denying all actions."
        }
      ],
      "answer": "B",
      "explanation": "Best practice dictates that before deleting access keys, you should first make them inactive. This ensures that if some undocumented application was relying on those keys, you can quickly reactivate them rather than causing a permanent outage. Once verified, delete them."
    },
    {
      "question": "Which mechanism allows an IAM user in one AWS account to switch to a role in a different AWS account using the AWS Management Console?",
      "options": [
        {
          "letter": "A",
          "text": "AWS Organizations Resource Access Manager (RAM)"
        },
        {
          "letter": "B",
          "text": "VPC Peering with IAM policy propagation"
        },
        {
          "letter": "C",
          "text": "Cross-account role assumption using a Trust Policy"
        },
        {
          "letter": "D",
          "text": "Cognito Identity Pools"
        }
      ],
      "answer": "C",
      "explanation": "In the AWS Management Console, users can use the \"Switch Role\" feature. Behind the scenes, this executes an `sts:AssumeRole` API call. The target role must have a Trust Policy that allows the principal (the IAM user in the other account) to assume it."
    }
  ],
  "t12": [
    {
      "question": "An application running on EC2 instances in a private subnet needs to access the internet to download software updates. The instances should not be reachable from the public internet. Which architecture meets these requirements?",
      "options": [
        {
          "letter": "A",
          "text": "Attach an Elastic IP to each EC2 instance and update the route table to point to an Internet Gateway."
        },
        {
          "letter": "B",
          "text": "Deploy a NAT Gateway in a public subnet and route outbound traffic from the private subnet to the NAT Gateway."
        },
        {
          "letter": "C",
          "text": "Create a VPC Peering connection to a public VPC that has an Internet Gateway."
        },
        {
          "letter": "D",
          "text": "Use a Network ACL to block all inbound traffic from 0.0.0.0/0 on the public subnet."
        }
      ],
      "answer": "B",
      "explanation": "A NAT Gateway allows instances in a private subnet to connect to services outside the VPC but external services cannot initiate a connection with those instances. The NAT Gateway must reside in a public subnet with a route to an Internet Gateway (IGW)."
    },
    {
      "question": "A security team has identified a malicious IP address (198.51.100.24) that is repeatedly scanning your EC2 instances. You want to block this specific IP address from reaching any instance in your web tier subnet. What is the most efficient way to block this traffic?",
      "options": [
        {
          "letter": "A",
          "text": "Create a deny rule for the IP in the Security Group attached to the EC2 instances."
        },
        {
          "letter": "B",
          "text": "Use a Network ACL attached to the web tier subnet and add a Deny rule for that IP address with a low rule number."
        },
        {
          "letter": "C",
          "text": "Use AWS WAF to block the IP at the VPC level."
        },
        {
          "letter": "D",
          "text": "Create a route in the Route Table pointing the malicious IP to a blackhole."
        }
      ],
      "answer": "B",
      "explanation": "Security Groups (SGs) only support ALLOW rules; you cannot create a DENY rule in an SG. Network ACLs (NACLs) operate at the subnet level and support both ALLOW and DENY rules. Since NACLs are evaluated in numerical order, placing a Deny rule with a lower number than the Allow rules will effectively block the IP."
    },
    {
      "question": "A company stores its database passwords in SSM Parameter Store using the SecureString parameter type. They are migrating to a microservices architecture and require that these database passwords be automatically rotated every 30 days without application downtime. What should the architect recommend?",
      "options": [
        {
          "letter": "A",
          "text": "Configure an EventBridge rule to trigger a Lambda function to rotate the SSM Parameter Store values every 30 days."
        },
        {
          "letter": "B",
          "text": "Migrate the credentials to AWS Secrets Manager and enable the built-in automatic rotation feature."
        },
        {
          "letter": "C",
          "text": "Use AWS Key Management Service (KMS) automatic key rotation to rotate the passwords every 30 days."
        },
        {
          "letter": "D",
          "text": "Enable the native auto-rotation feature in SSM Parameter Store by setting the `RotationEnabled` flag to true."
        }
      ],
      "answer": "B",
      "explanation": "AWS Secrets Manager natively supports automatic credential rotation for databases (like RDS) without requiring custom code. SSM Parameter Store does NOT have a built-in auto-rotation feature for passwords. (Note: KMS key rotation rotates the encryption key, not the database password itself)."
    },
    {
      "question": "An e-commerce website is hosted on EC2 instances behind an Application Load Balancer (ALB). The company is concerned about SQL injection and Cross-Site Scripting (XSS) attacks. Which AWS service should be implemented to protect against these Layer 7 attacks?",
      "options": [
        {
          "letter": "A",
          "text": "AWS Shield Advanced"
        },
        {
          "letter": "B",
          "text": "AWS Network Firewall"
        },
        {
          "letter": "C",
          "text": "AWS WAF"
        },
        {
          "letter": "D",
          "text": "Amazon GuardDuty"
        }
      ],
      "answer": "C",
      "explanation": "AWS WAF (Web Application Firewall) operates at Layer 7 and is specifically designed to block web exploits like SQL injection and XSS. It can be attached directly to an ALB, API Gateway, AppSync, or CloudFront distribution. AWS Shield is for DDoS protection (L3/L4)."
    },
    {
      "question": "A company is building a mobile gaming application. Users should be able to log in using their Facebook or Google accounts. Once authenticated, the application needs to upload game save data directly to a user-specific folder in an Amazon S3 bucket. Which combination of services should be used?",
      "options": [
        {
          "letter": "A",
          "text": "Amazon Cognito User Pools and IAM Identity Center"
        },
        {
          "letter": "B",
          "text": "Amazon Cognito Identity Pools (Federated Identities) and AWS STS"
        },
        {
          "letter": "C",
          "text": "IAM Roles for EC2 and Amazon Cognito User Pools"
        },
        {
          "letter": "D",
          "text": "AWS Directory Service and Amazon S3 Access Points"
        }
      ],
      "answer": "B",
      "explanation": "Cognito Identity Pools (Federated Identities) are used to exchange authentication tokens (from social IdPs like Facebook/Google) for temporary, scoped AWS credentials (via STS). This allows the mobile app to securely call AWS APIs, like uploading to S3, directly from the device."
    },
    {
      "question": "A security audit requires the company to actively monitor its AWS environment for unauthorized behavior, such as cryptocurrency mining on EC2 instances, unusual API calls, and compromised credentials. Which service provides this intelligent threat detection?",
      "options": [
        {
          "letter": "A",
          "text": "Amazon Inspector"
        },
        {
          "letter": "B",
          "text": "Amazon Macie"
        },
        {
          "letter": "C",
          "text": "Amazon GuardDuty"
        },
        {
          "letter": "D",
          "text": "AWS Security Hub"
        }
      ],
      "answer": "C",
      "explanation": "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior (like crypto mining or compromised credentials) by analyzing CloudTrail events, VPC Flow Logs, and DNS logs."
    },
    {
      "question": "A healthcare company stores millions of patient records in Amazon S3. The compliance team wants a solution to continuously scan the S3 buckets to discover and classify any Personally Identifiable Information (PII) or Protected Health Information (PHI). Which service should they use?",
      "options": [
        {
          "letter": "A",
          "text": "Amazon Macie"
        },
        {
          "letter": "B",
          "text": "Amazon GuardDuty"
        },
        {
          "letter": "C",
          "text": "AWS Artifact"
        },
        {
          "letter": "D",
          "text": "Amazon Inspector"
        }
      ],
      "answer": "A",
      "explanation": "Amazon Macie is an AI/ML-powered data security and data privacy service that specifically discovers, classifies, and protects sensitive data (like PII and PHI) stored in Amazon S3."
    },
    {
      "question": "A company has an on-premises data center and wants to establish a dedicated, private network connection to their AWS VPC. The connection must not traverse the public internet and must provide consistent, low latency. Which service meets these requirements?",
      "options": [
        {
          "letter": "A",
          "text": "AWS Site-to-Site VPN"
        },
        {
          "letter": "B",
          "text": "AWS Client VPN"
        },
        {
          "letter": "C",
          "text": "AWS Direct Connect"
        },
        {
          "letter": "D",
          "text": "AWS Transit Gateway"
        }
      ],
      "answer": "C",
      "explanation": "AWS Direct Connect (DX) provides a dedicated, private physical network connection from an on-premises facility to AWS. It does not use the public internet, offering more consistent performance and lower latency than a VPN."
    },
    {
      "question": "You have configured a Security Group for your web servers to allow inbound HTTP (port 80) traffic from the internet. Do you need to explicitly configure an outbound rule in the Security Group to allow the HTTP response back to the client?",
      "options": [
        {
          "letter": "A",
          "text": "Yes, because Security Groups are stateless."
        },
        {
          "letter": "B",
          "text": "No, because Security Groups are stateful."
        },
        {
          "letter": "C",
          "text": "Yes, you must allow outbound traffic on ephemeral ports (1024-65535)."
        },
        {
          "letter": "D",
          "text": "No, because the Internet Gateway automatically handles return traffic."
        }
      ],
      "answer": "B",
      "explanation": "Security Groups are stateful. This means if you send a request from your instance, the response traffic for that request is allowed to flow in regardless of inbound security group rules. Conversely, if inbound traffic is allowed, responses to that traffic are allowed to flow out regardless of outbound rules."
    },
    {
      "question": "A financial institution requires that their dedicated AWS Direct Connect link be encrypted in transit using IPsec to meet regulatory compliance. How can this be achieved?",
      "options": [
        {
          "letter": "A",
          "text": "Enable the `RequireEncryption` flag on the Direct Connect Virtual Interface."
        },
        {
          "letter": "B",
          "text": "Direct Connect traffic is encrypted natively at Layer 2; no action is required."
        },
        {
          "letter": "C",
          "text": "Configure an AWS Site-to-Site VPN connection over the Direct Connect link."
        },
        {
          "letter": "D",
          "text": "Use AWS Certificate Manager (ACM) to provision a TLS certificate for the Direct Connect connection."
        }
      ],
      "answer": "C",
      "explanation": "AWS Direct Connect does NOT encrypt traffic in transit by default (it is just a private physical connection). If compliance requires IPsec encryption, you must layer an AWS Site-to-Site VPN over the Direct Connect connection."
    },
    {
      "question": "Your application uses an Application Load Balancer (ALB) and is experiencing a massive spike in traffic, which you suspect is a volumetric DDoS attack (e.g., a UDP reflection attack). Which AWS service natively protects against these Layer 3 and Layer 4 attacks at no additional charge?",
      "options": [
        {
          "letter": "A",
          "text": "AWS WAF"
        },
        {
          "letter": "B",
          "text": "AWS Shield Standard"
        },
        {
          "letter": "C",
          "text": "AWS Shield Advanced"
        },
        {
          "letter": "D",
          "text": "Amazon GuardDuty"
        }
      ],
      "answer": "B",
      "explanation": "AWS Shield Standard is automatically enabled for all AWS customers at no extra cost. It defends against most common, frequently occurring network and transport layer (Layer 3 and 4) DDoS attacks that target your website or applications."
    },
    {
      "question": "An architecture consists of an ALB in a public subnet and EC2 instances in a private subnet. What is the most secure way to configure the Security Group (SG) for the EC2 instances?",
      "options": [
        {
          "letter": "A",
          "text": "Allow inbound HTTP/HTTPS from 0.0.0.0/0."
        },
        {
          "letter": "B",
          "text": "Allow inbound HTTP/HTTPS from the VPC CIDR block."
        },
        {
          "letter": "C",
          "text": "Allow inbound HTTP/HTTPS referencing the ID of the ALB's Security Group."
        },
        {
          "letter": "D",
          "text": "Allow inbound HTTP/HTTPS referencing the elastic IP of the NAT Gateway."
        }
      ],
      "answer": "C",
      "explanation": "To ensure that the EC2 instances only accept traffic that has passed through the ALB, you configure the instance SG to allow inbound traffic where the source is the Security Group ID of the ALB. This is a fundamental AWS security best practice known as Security Group chaining."
    },
    {
      "question": "You are troubleshooting a connectivity issue. An EC2 instance in a public subnet cannot be reached from the internet on port 80. The Security Group allows inbound port 80 from 0.0.0.0/0. The subnet has a Network ACL. What must be configured on the Network ACL to allow this communication?",
      "options": [
        {
          "letter": "A",
          "text": "Allow inbound port 80; no outbound rules are needed because NACLs are stateful."
        },
        {
          "letter": "B",
          "text": "Allow inbound port 80 and allow outbound on ephemeral ports (1024-65535)."
        },
        {
          "letter": "C",
          "text": "Allow inbound port 80 and allow outbound on port 80."
        },
        {
          "letter": "D",
          "text": "Allow inbound on ephemeral ports (1024-65535) and allow outbound on port 80."
        }
      ],
      "answer": "B",
      "explanation": "Because NACLs are stateless, you must explicitly allow both the inbound request AND the outbound response. The inbound request comes on port 80. The outbound response is sent to the client's ephemeral port, which usually falls in the range of 1024-65535. Therefore, you must allow outbound traffic on these high ports."
    },
    {
      "question": "A company wants to securely store its SSL/TLS certificates and automatically deploy them to their Application Load Balancers and CloudFront distributions. Which service should they use?",
      "options": [
        {
          "letter": "A",
          "text": "AWS Secrets Manager"
        },
        {
          "letter": "B",
          "text": "AWS Key Management Service (KMS)"
        },
        {
          "letter": "C",
          "text": "AWS Certificate Manager (ACM)"
        },
        {
          "letter": "D",
          "text": "Amazon S3 with SSE-KMS"
        }
      ],
      "answer": "C",
      "explanation": "AWS Certificate Manager (ACM) is used to provision, manage, and deploy public and private SSL/TLS certificates for use with AWS services (like ALBs and CloudFront) and your internal connected resources."
    },
    {
      "question": "A security administrator has received an alert from Amazon GuardDuty indicating that an EC2 instance may be compromised and is communicating with a known command-and-control server. What is the BEST automated remediation strategy?",
      "options": [
        {
          "letter": "A",
          "text": "Configure GuardDuty to automatically terminate the EC2 instance."
        },
        {
          "letter": "B",
          "text": "Use Amazon Macie to quarantine the EC2 instance's EBS volume."
        },
        {
          "letter": "C",
          "text": "Configure Amazon EventBridge to capture the GuardDuty finding and trigger an AWS Lambda function to isolate the instance by modifying its Security Group."
        },
        {
          "letter": "D",
          "text": "Use AWS WAF to block the command-and-control server's IP address globally."
        }
      ],
      "answer": "C",
      "explanation": "GuardDuty generates findings but does not automatically remediate them. The standard automated remediation pattern is to route the GuardDuty finding through Amazon EventBridge, which then triggers a target (like an AWS Lambda function) to take action, such as applying an isolating Security Group to the compromised instance."
    }
  ],
  "t13": [
    {
      "question": "A company uses AWS KMS Customer Managed Keys (CMKs) to encrypt sensitive data. Due to a new compliance requirement, they must ensure the key material is rotated exactly every 90 days. How can this be achieved?",
      "options": [
        {
          "letter": "A",
          "text": "Enable automatic key rotation on the CMK, which rotates the key every 90 days."
        },
        {
          "letter": "B",
          "text": "Create a new CMK every 90 days, update applications to use the new key alias, and retain the old key for decryption."
        },
        {
          "letter": "C",
          "text": "Use AWS Secrets Manager to rotate the KMS key every 90 days."
        },
        {
          "letter": "D",
          "text": "Contact AWS Support to change the default automatic rotation schedule from 365 days to 90 days."
        }
      ],
      "answer": "B",
      "explanation": "AWS KMS automatic key rotation happens every 365 days (and cannot be customized to 90 days). If a strict 90-day schedule is required, you must perform manual key rotation by creating a new CMK and updating your application's key alias to point to the new key."
    },
    {
      "question": "An application needs to store user-uploaded documents in Amazon S3. The company's security policy states that the encryption keys must be managed entirely on-premises, and AWS must never store or manage the encryption keys. Which S3 encryption method should be used?",
      "options": [
        {
          "letter": "A",
          "text": "SSE-S3"
        },
        {
          "letter": "B",
          "text": "SSE-KMS with a Customer Managed Key (CMK)"
        },
        {
          "letter": "C",
          "text": "SSE-C"
        },
        {
          "letter": "D",
          "text": "Client-Side Encryption with AWS KMS"
        }
      ],
      "answer": "C",
      "explanation": "Server-Side Encryption with Customer-Provided Keys (SSE-C) requires the client to send the encryption key in the HTTP header along with the object. AWS uses the key to encrypt the data and then immediately discards the key. AWS never stores the key."
    },
    {
      "question": "A financial institution must store regulatory records in an S3 bucket for 7 years. During this time, the records must not be deleted or overwritten by anyone, including the AWS account root user. What is the most appropriate solution?",
      "options": [
        {
          "letter": "A",
          "text": "Enable S3 Versioning and MFA Delete."
        },
        {
          "letter": "B",
          "text": "Configure S3 Object Lock in Governance mode with a 7-year retention period."
        },
        {
          "letter": "C",
          "text": "Configure S3 Object Lock in Compliance mode with a 7-year retention period."
        },
        {
          "letter": "D",
          "text": "Apply a bucket policy denying `s3:DeleteObject` for all principals."
        }
      ],
      "answer": "C",
      "explanation": "S3 Object Lock in Compliance mode ensures that an object version cannot be overwritten or deleted by ANY user, including the root user, for the duration of the retention period. Governance mode allows users with specific permissions to bypass the lock. Bucket policies can be modified by admins."
    },
    {
      "question": "A company hosts a web application using an Application Load Balancer (ALB) and EC2 instances. They want to encrypt all traffic in transit from the client to the ALB using a custom domain name (e.g., app.example.com). What is the most cost-effective and operationally efficient way to manage the SSL/TLS certificate?",
      "options": [
        {
          "letter": "A",
          "text": "Purchase a certificate from a third-party CA, upload it to IAM, and write a script to rotate it annually."
        },
        {
          "letter": "B",
          "text": "Request a public certificate via AWS Certificate Manager (ACM) and attach it to the ALB."
        },
        {
          "letter": "C",
          "text": "Install a self-signed certificate directly on the EC2 instances."
        },
        {
          "letter": "D",
          "text": "Use AWS KMS to generate an asymmetric key pair and use it for TLS termination."
        }
      ],
      "answer": "B",
      "explanation": "AWS Certificate Manager (ACM) provides free public SSL/TLS certificates and natively integrates with ALBs. If DNS validation is used, ACM also handles the automatic renewal of the certificate, making it the most cost-effective and operationally efficient choice."
    },
    {
      "question": "You are deploying a CloudFront distribution to serve static content globally. You want to use a custom domain name with HTTPS. Where must you request or import the ACM SSL/TLS certificate?",
      "options": [
        {
          "letter": "A",
          "text": "In the AWS Region closest to the majority of your users."
        },
        {
          "letter": "B",
          "text": "In the AWS Region where your S3 origin bucket is located."
        },
        {
          "letter": "C",
          "text": "In the `us-east-1` (N. Virginia) Region."
        },
        {
          "letter": "D",
          "text": "In every AWS Region where CloudFront has an edge location."
        }
      ],
      "answer": "C",
      "explanation": "This is a strict AWS requirement. To use an ACM certificate with Amazon CloudFront, the certificate MUST be requested or imported in the US East (N. Virginia) region (`us-east-1`)."
    },
    {
      "question": "A database administrator accidentally deleted a critical DynamoDB table. The company needs to restore the table to the state it was in exactly 5 minutes before the deletion. How can this be accomplished?",
      "options": [
        {
          "letter": "A",
          "text": "Restore the table from the most recent daily automated backup."
        },
        {
          "letter": "B",
          "text": "If Point-in-Time Recovery (PITR) was enabled, restore the table to the exact timestamp 5 minutes prior to deletion."
        },
        {
          "letter": "C",
          "text": "Contact AWS Support to retrieve the table from the AWS internal recycle bin."
        },
        {
          "letter": "D",
          "text": "Use AWS Backup to perform an in-place restore of the deleted records."
        }
      ],
      "answer": "B",
      "explanation": "DynamoDB Point-in-Time Recovery (PITR) allows you to restore a table to any single second within the last 35 days. Restoring from PITR creates a NEW table; it does not perform an in-place restore, but it perfectly solves the accidental deletion scenario."
    },
    {
      "question": "An administrator created an IAM Role in Account A and granted it `s3:GetObject` access to a bucket in Account A. The administrator then modified the bucket's encryption to use a KMS Customer Managed Key (CMK). However, the IAM role is now receiving \"Access Denied\" errors when trying to read the objects. What is missing?",
      "options": [
        {
          "letter": "A",
          "text": "The IAM Role needs to be assigned to the root user."
        },
        {
          "letter": "B",
          "text": "The S3 bucket policy must explicitly allow the `kms:Decrypt` action."
        },
        {
          "letter": "C",
          "text": "Both the IAM Role's policy and the KMS Key Policy must allow the `kms:Decrypt` action."
        },
        {
          "letter": "D",
          "text": "The KMS key must be changed to an AWS Managed Key instead of a CMK."
        }
      ],
      "answer": "C",
      "explanation": "When reading SSE-KMS encrypted objects, the principal needs permission for both the S3 object (`s3:GetObject`) AND the KMS key (`kms:Decrypt`). Furthermore, for KMS CMKs, the KMS Key Policy itself must allow the IAM role to use it, in addition to the IAM policy."
    },
    {
      "question": "A company wants to enforce that every S3 bucket created in their AWS environment must have Server-Side Encryption enabled by default. How can they centrally monitor and report on whether all buckets comply with this rule?",
      "options": [
        {
          "letter": "A",
          "text": "Use Amazon GuardDuty to alert on unencrypted buckets."
        },
        {
          "letter": "B",
          "text": "Enable AWS CloudTrail and search for the `CreateBucket` API call."
        },
        {
          "letter": "C",
          "text": "Create an AWS Config rule to evaluate `s3-bucket-server-side-encryption-enabled`."
        },
        {
          "letter": "D",
          "text": "Use Amazon Macie to enforce encryption on all objects."
        }
      ],
      "answer": "C",
      "explanation": "AWS Config continuously monitors and records your AWS resource configurations. You can use AWS Config rules to evaluate whether resources comply with your company's guidelines, such as ensuring S3 buckets have default encryption enabled."
    },
    {
      "question": "During a security investigation, you need to determine exactly which IAM user terminated a specific production EC2 instance yesterday at 4:00 PM. Which AWS service provides this information?",
      "options": [
        {
          "letter": "A",
          "text": "Amazon CloudWatch Logs"
        },
        {
          "letter": "B",
          "text": "AWS CloudTrail"
        },
        {
          "letter": "C",
          "text": "AWS Config"
        },
        {
          "letter": "D",
          "text": "VPC Flow Logs"
        }
      ],
      "answer": "B",
      "explanation": "AWS CloudTrail records AWS API calls for your account. It provides event history, showing \"who did what, when, and from where.\" This is the service you use to trace the identity of the user who called the `TerminateInstances` API."
    },
    {
      "question": "An application stores infrequently accessed log files in an S3 bucket. The company wants to optimize costs by moving files older than 90 days to a cheaper storage tier, but the files must remain immediately accessible (within milliseconds) if needed. Which S3 storage class should they transition to?",
      "options": [
        {
          "letter": "A",
          "text": "S3 Standard-IA"
        },
        {
          "letter": "B",
          "text": "S3 Glacier Flexible Retrieval"
        },
        {
          "letter": "C",
          "text": "S3 Glacier Instant Retrieval"
        },
        {
          "letter": "D",
          "text": "S3 One Zone-IA"
        }
      ],
      "answer": "C",
      "explanation": "S3 Glacier Instant Retrieval is the lowest-cost storage class that still provides immediate access (milliseconds) for long-lived, rarely accessed data. Standard-IA is also immediate but more expensive. Glacier Flexible Retrieval requires minutes to hours for retrieval."
    },
    {
      "question": "You want to ensure that cross-account access to an S3 bucket is tightly controlled. Which mechanism allows you to evaluate the current state of an S3 bucket's public access settings and automatically trigger a remediation script if it becomes publicly accessible?",
      "options": [
        {
          "letter": "A",
          "text": "AWS CloudTrail + Amazon EventBridge"
        },
        {
          "letter": "B",
          "text": "AWS Config + AWS Systems Manager Automation"
        },
        {
          "letter": "C",
          "text": "Amazon GuardDuty + AWS Lambda"
        },
        {
          "letter": "D",
          "text": "Amazon Macie + AWS Step Functions"
        }
      ],
      "answer": "B",
      "explanation": "AWS Config assesses resource configurations for compliance. If a resource (like an S3 bucket) is marked non-compliant (e.g., it becomes public), Config can automatically trigger a remediation action using an AWS Systems Manager (SSM) Automation document."
    },
    {
      "question": "A company uses AWS Backup to centrally manage backups across multiple AWS services. They need to ensure that their backup vaults are protected against malicious deletions by compromised administrator accounts. Which feature provides this protection?",
      "options": [
        {
          "letter": "A",
          "text": "AWS Backup MFA Delete"
        },
        {
          "letter": "B",
          "text": "AWS Backup Vault Lock"
        },
        {
          "letter": "C",
          "text": "AWS Key Management Service (KMS) CMK Rotation"
        },
        {
          "letter": "D",
          "text": "Amazon S3 Object Lock"
        }
      ],
      "answer": "B",
      "explanation": "AWS Backup Vault Lock enforces a Write-Once-Read-Many (WORM) setting on your backup vaults. In Compliance mode, this prevents any user (including the AWS account root user or admins) from deleting backups or altering retention periods."
    },
    {
      "question": "You need to enforce that all data uploaded to an S3 bucket is encrypted in transit. How can you accomplish this?",
      "options": [
        {
          "letter": "A",
          "text": "Enable Default Encryption on the S3 bucket using SSE-KMS."
        },
        {
          "letter": "B",
          "text": "Attach an IAM policy to all users requiring them to use an HTTPS endpoint."
        },
        {
          "letter": "C",
          "text": "Attach an S3 Bucket Policy with a Deny effect where `aws:SecureTransport` is `false`."
        },
        {
          "letter": "D",
          "text": "Enable S3 Block Public Access at the account level."
        }
      ],
      "answer": "C",
      "explanation": "To enforce encryption in transit, you use a resource-based S3 Bucket Policy that explicitly denies any requests where the `aws:SecureTransport` condition is false (meaning the request came in over HTTP rather than HTTPS)."
    },
    {
      "question": "A company wants to replicate its S3 bucket data to a different AWS Region to meet Disaster Recovery (DR) requirements. The bucket contains 5 TB of existing data. After enabling Cross-Region Replication (CRR), what happens to the existing data?",
      "options": [
        {
          "letter": "A",
          "text": "It is automatically replicated to the destination bucket within 24 hours."
        },
        {
          "letter": "B",
          "text": "It remains only in the source bucket; CRR only replicates new or updated objects."
        },
        {
          "letter": "C",
          "text": "It is replicated immediately, but you must pay data transfer costs."
        },
        {
          "letter": "D",
          "text": "It cannot be replicated; CRR requires an empty source bucket to be enabled."
        }
      ],
      "answer": "B",
      "explanation": "By default, S3 Cross-Region Replication only replicates newly uploaded objects or updates made *after* replication is enabled. To replicate existing objects, you must use a feature called S3 Batch Replication."
    },
    {
      "question": "Which AWS service acts as a single pane of glass to aggregate security findings from Amazon GuardDuty, Amazon Inspector, and Amazon Macie, and compares your environment against security industry standards like the CIS AWS Foundations Benchmark?",
      "options": [
        {
          "letter": "A",
          "text": "AWS Audit Manager"
        },
        {
          "letter": "B",
          "text": "AWS Config"
        },
        {
          "letter": "C",
          "text": "AWS Security Hub"
        },
        {
          "letter": "D",
          "text": "AWS Trusted Advisor"
        }
      ],
      "answer": "C",
      "explanation": "AWS Security Hub is a cloud security posture management service that aggregates alerts/findings from various AWS security services and provides automated compliance checks against best practice frameworks like CIS."
    }
  ],
  "t21": [
    {
      "question": "A media company is migrating a legacy video rendering application to AWS. The application uses a custom polling mechanism that checks a database every minute to see if a new rendering job is available. This approach is causing high database load. How can a Solutions Architect redesign this to be more scalable and loosely coupled?",
      "options": [
        {
          "letter": "A",
          "text": "Migrate the database to Amazon RDS Multi-AZ to handle the polling load."
        },
        {
          "letter": "B",
          "text": "Use Amazon EventBridge to schedule the polling mechanism to run every 5 minutes."
        },
        {
          "letter": "C",
          "text": "Use Amazon SQS to decouple the application. Video upload events send a message to the queue, and rendering workers poll the queue."
        },
        {
          "letter": "D",
          "text": "Store the video jobs in an S3 bucket and use S3 Select to filter new jobs."
        }
      ],
      "answer": "C",
      "explanation": "Amazon SQS is specifically designed for decoupling components and distributing workloads across multiple workers. By using an SQS queue, the database is no longer polled constantly. Workers can scale based on the queue depth and pull rendering jobs exactly when they have capacity."
    },
    {
      "question": "An e-commerce application uses Amazon SNS to publish notifications when a new order is placed. The notifications are sent to an email endpoint for the warehouse team and an SQS queue for the billing service. The billing service is occasionally down for maintenance, causing some messages to be lost. How can this be resolved?",
      "options": [
        {
          "letter": "A",
          "text": "Change the SNS topic to an SQS FIFO queue."
        },
        {
          "letter": "B",
          "text": "SNS automatically retries delivery to SQS indefinitely, so no action is required."
        },
        {
          "letter": "C",
          "text": "There is no issue; SQS persists the messages pushed by SNS until the billing service pulls them."
        },
        {
          "letter": "D",
          "text": "Configure an SNS Dead-Letter Queue (DLQ) to capture messages that the billing service failed to process."
        }
      ],
      "answer": "C",
      "explanation": "SNS pushes messages to SQS. SQS is a durable message broker that persists messages for up to 14 days. If the billing service is down, the messages will simply back up in the SQS queue. When the service comes back online, it will poll the queue and process the backlog."
    },
    {
      "question": "A financial application processes transactions that must be handled in the exact order they were received, and no transaction can be processed more than once. Which service should a Solutions Architect choose?",
      "options": [
        {
          "letter": "A",
          "text": "Amazon SQS Standard queue"
        },
        {
          "letter": "B",
          "text": "Amazon SNS with strict ordering enabled"
        },
        {
          "letter": "C",
          "text": "Amazon Kinesis Data Streams"
        },
        {
          "letter": "D",
          "text": "Amazon SQS FIFO queue"
        }
      ],
      "answer": "D",
      "explanation": "SQS FIFO (First-In-First-Out) queues guarantee exactly-once processing and strict ordering. SQS Standard only provides best-effort ordering and at-least-once delivery."
    },
    {
      "question": "An application relies on an Amazon SQS queue. Occasionally, workers crash while processing a message. When this happens, the message is not deleted from the queue, and another worker picks it up immediately, causing duplicate processing. How can the architect prevent duplicate processing for crashing workers?",
      "options": [
        {
          "letter": "A",
          "text": "Enable Long Polling on the SQS queue."
        },
        {
          "letter": "B",
          "text": "Increase the Visibility Timeout on the SQS queue."
        },
        {
          "letter": "C",
          "text": "Use an Amazon SNS topic instead of SQS."
        },
        {
          "letter": "D",
          "text": "Configure a Dead-Letter Queue (DLQ)."
        }
      ],
      "answer": "B",
      "explanation": "The Visibility Timeout dictates how long a message is 'hidden' from other consumers after being picked up by a worker. If it is too short, the message becomes visible to other workers before the original worker finishes processing, leading to duplicates. Increasing the timeout gives the original worker enough time to finish and delete the message."
    },
    {
      "question": "A company wants to migrate an existing application that uses the RabbitMQ messaging protocol to AWS without rewriting the application code. Which AWS service is best suited for this?",
      "options": [
        {
          "letter": "A",
          "text": "Amazon SQS"
        },
        {
          "letter": "B",
          "text": "Amazon SNS"
        },
        {
          "letter": "C",
          "text": "Amazon MQ"
        },
        {
          "letter": "D",
          "text": "Amazon EventBridge"
        }
      ],
      "answer": "C",
      "explanation": "Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ. It makes it easy to migrate existing applications that use standard messaging protocols (AMQP, MQTT, OpenWire, STOMP) to AWS without rewriting code."
    },
    {
      "question": "A highly scalable web application needs to handle unpredictable spikes in traffic. The application logic is stateless and can be executed within a few seconds. The company wants to minimize operational overhead and pay only for the compute time consumed. Which compute option should they use?",
      "options": [
        {
          "letter": "A",
          "text": "Amazon EC2 instances in an Auto Scaling group"
        },
        {
          "letter": "B",
          "text": "AWS Lambda"
        },
        {
          "letter": "C",
          "text": "Amazon ECS using the EC2 launch type"
        },
        {
          "letter": "D",
          "text": "AWS Elastic Beanstalk"
        }
      ],
      "answer": "B",
      "explanation": "AWS Lambda is a fully serverless compute service that automatically scales to handle unpredictable traffic spikes. You pay only for the compute time consumed (down to the millisecond) and there are no servers to manage. Since the logic is stateless and short-lived, it is a perfect fit."
    },
    {
      "question": "A developer deployed an AWS Lambda function that queries a backend RDS database. During traffic spikes, the database gets overwhelmed by too many concurrent connections from the Lambda function scaling up. How can the architect prevent Lambda from overwhelming the database?",
      "options": [
        {
          "letter": "A",
          "text": "Configure Provisioned Concurrency for the Lambda function."
        },
        {
          "letter": "B",
          "text": "Configure Reserved Concurrency for the Lambda function."
        },
        {
          "letter": "C",
          "text": "Place an Application Load Balancer in front of the database."
        },
        {
          "letter": "D",
          "text": "Increase the memory allocation for the Lambda function."
        }
      ],
      "answer": "B",
      "explanation": "Reserved Concurrency guarantees a maximum number of concurrent executions for a Lambda function. It acts as a throttle, preventing the function from scaling beyond the set limit and overwhelming downstream resources like an RDS database."
    },
    {
      "question": "An AWS Lambda function is experiencing high latency on its initial invocations after periods of inactivity. What is the most cost-effective way to solve this 'cold start' issue?",
      "options": [
        {
          "letter": "A",
          "text": "Increase the Lambda function's timeout setting."
        },
        {
          "letter": "B",
          "text": "Migrate the function to Amazon EC2."
        },
        {
          "letter": "C",
          "text": "Configure Provisioned Concurrency for the Lambda function."
        },
        {
          "letter": "D",
          "text": "Use Amazon API Gateway caching."
        }
      ],
      "answer": "C",
      "explanation": "Provisioned Concurrency initializes a requested number of execution environments so that they are prepared to respond immediately to your function's invocations. This completely eliminates cold starts for the configured capacity."
    },
    {
      "question": "A microservices application is deployed on Amazon ECS. The company wants to remove the operational burden of managing the underlying EC2 instances and let AWS handle cluster provisioning and scaling. Which launch type should they choose?",
      "options": [
        {
          "letter": "A",
          "text": "EC2 Launch Type"
        },
        {
          "letter": "B",
          "text": "Fargate Launch Type"
        },
        {
          "letter": "C",
          "text": "EKS Launch Type"
        },
        {
          "letter": "D",
          "text": "Elastic Beanstalk"
        }
      ],
      "answer": "B",
      "explanation": "AWS Fargate is a serverless compute engine for containers that works with both Amazon ECS and EKS. It removes the need to provision and manage servers, letting you specify and pay for resources per application."
    },
    {
      "question": "A company needs to orchestrate a complex, multi-step business process that involves human approval, parallel processing, and conditional logic. The entire workflow might take up to a week to complete. Which AWS service is the most appropriate for coordinating this?",
      "options": [
        {
          "letter": "A",
          "text": "AWS Step Functions Standard Workflows"
        },
        {
          "letter": "B",
          "text": "AWS Step Functions Express Workflows"
        },
        {
          "letter": "C",
          "text": "AWS Lambda"
        },
        {
          "letter": "D",
          "text": "Amazon SQS"
        }
      ],
      "answer": "A",
      "explanation": "AWS Step Functions Standard Workflows are designed for long-running, auditable workflows that can run for up to a year. They natively support human approval steps via activity tasks and callback patterns. Express workflows only run for a maximum of 5 minutes."
    },
    {
      "question": "A company is using Amazon API Gateway to expose a REST API backed by AWS Lambda. They notice that a significant portion of the traffic is requesting the exact same static dataset, causing unnecessary Lambda invocations and increasing costs. How can they optimize this architecture?",
      "options": [
        {
          "letter": "A",
          "text": "Enable API Gateway caching."
        },
        {
          "letter": "B",
          "text": "Use an Application Load Balancer instead of API Gateway."
        },
        {
          "letter": "C",
          "text": "Increase the Lambda function's memory."
        },
        {
          "letter": "D",
          "text": "Migrate the data to Amazon S3."
        }
      ],
      "answer": "A",
      "explanation": "API Gateway caching can cache endpoint responses for a specified TTL (time-to-live). When caching is enabled, API Gateway responds to the request directly from the cache instead of invoking the backend Lambda function, significantly reducing costs and latency for frequently requested data."
    },
    {
      "question": "An application is using an SQS Standard queue. A developer notices that some messages are being processed twice. Which action will completely eliminate duplicate messages without changing the underlying queue type?",
      "options": [
        {
          "letter": "A",
          "text": "Enable Long Polling."
        },
        {
          "letter": "B",
          "text": "Increase the Visibility Timeout to 12 hours."
        },
        {
          "letter": "C",
          "text": "Configure a Dead-Letter Queue."
        },
        {
          "letter": "D",
          "text": "None. SQS Standard does not guarantee exactly-once processing."
        }
      ],
      "answer": "D",
      "explanation": "SQS Standard queues provide at-least-once delivery, meaning duplicate messages can occur by design due to the distributed nature of the service. The only way to guarantee exactly-once processing at the queue level is to use an SQS FIFO queue."
    },
    {
      "question": "A SaaS provider wants to stream real-time events from their AWS environment directly to their clients' AWS accounts. Which service allows event-driven integration with partner SaaS applications without writing custom polling code?",
      "options": [
        {
          "letter": "A",
          "text": "Amazon SNS"
        },
        {
          "letter": "B",
          "text": "Amazon EventBridge"
        },
        {
          "letter": "C",
          "text": "Amazon Kinesis Data Streams"
        },
        {
          "letter": "D",
          "text": "Amazon MQ"
        }
      ],
      "answer": "B",
      "explanation": "Amazon EventBridge is a serverless event bus that connects applications together using data from your own applications, integrated SaaS applications, and AWS services. It natively supports SaaS partner integrations."
    },
    {
      "question": "A team wants to run a containerized application on AWS. The application requires access to a GPU for machine learning workloads. Which container service approach is the most suitable?",
      "options": [
        {
          "letter": "A",
          "text": "Amazon ECS with Fargate Launch Type"
        },
        {
          "letter": "B",
          "text": "AWS Lambda with container image support"
        },
        {
          "letter": "C",
          "text": "Amazon ECS with EC2 Launch Type"
        },
        {
          "letter": "D",
          "text": "AWS Elastic Beanstalk"
        }
      ],
      "answer": "C",
      "explanation": "While Fargate is great for general serverless containers, it does not currently support GPU instances. To use specialized hardware like GPUs, you must use the EC2 Launch Type, which allows you to provision specific EC2 instance families (like G4 or P3) and attach them to the ECS cluster."
    },
    {
      "question": "A developer needs to configure an AWS Lambda function to process messages from an SQS queue. What is the most efficient way to retrieve messages from the queue to minimize empty API calls and costs?",
      "options": [
        {
          "letter": "A",
          "text": "Configure the Lambda function to use Short Polling."
        },
        {
          "letter": "B",
          "text": "Configure the Lambda function to use Long Polling."
        },
        {
          "letter": "C",
          "text": "You do not need to configure polling; Lambda integrates natively with SQS using an event source mapping."
        },
        {
          "letter": "D",
          "text": "Use an Amazon EventBridge rule to trigger the Lambda function when a message arrives."
        }
      ],
      "answer": "C",
      "explanation": "Lambda natively supports SQS as an event source. When configured, AWS automatically manages the polling of the SQS queue using long polling on your behalf and invokes your Lambda function with batches of messages. You don't write or configure the polling code manually."
    }
  ]
};