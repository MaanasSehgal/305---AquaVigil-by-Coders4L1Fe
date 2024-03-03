# Aquavigil 

<div style="display: flex; flex-direction: row;">
  <div align="left">
    <h3>Introduction</h3>
    Aquavigil is a Customer Relationship Management (CRM) website designed to address water-related issues by providing a platform for users to report problems and 
    for authorities to efficiently manage and solve these issues. It serves as a bridge between concerned citizens and water management authorities, facilitating 
    effective communication and swift resolution of water-related concerns.
    <br/><br/>
  </div>
  <div align="center">
    <img src="https://res.cloudinary.com/de7hlbfce/image/upload/v1708859023/x53oinolgz2htuonr3fl.png" style="width: 100px; height: 100px;" alt="Aquavigil Logo">
  </div>
</div>

## 1. User Roles
- *Citizens/Users:* Individuals who can report water-related problems such as leaks, contamination, or infrastructure issues. They can also track the progress of their reported issues.
- *Authorities/Administrators:* Responsible entities tasked with resolving reported water problems. They have access to manage reported issues, assign tasks, communicate with users, and update the status of reported problems.

## 2. Features

### Reporting System
- Users can submit reports detailing water-related issues, including location, description, and urgency level.
- Option to upload images or documents to provide additional context.
- Automatic geotagging for precise issue location identification.

### Task Assignment and Management
- Authorities can assign tasks to specific personnel or teams for issue resolution.
- Priority setting for tasks based on urgency and severity.
- Track task progress and monitor resolution status.

### Classifying model
- Employed Python, TensorFlow, and Keras to construct a Convolutional Neural Network (CNN) for image classification. 
- Classified waterbody images into pits and flooded areas, implementing preprocessing, model training, and evaluation showcasing proficiency in deep learning techniques and model development.
- Used adam optimiser, binaryCrossEntropy loss function and accuracy performance metrics to train model.

### Knowledge Base
- Repository of information related to common water issues, solutions, and preventive measures.
- Frequently Asked Questions (FAQs) section to address common user queries.
- Educational resources to promote water conservation and awareness.

<h2>WorkFlow</h2>
<img src="https://res.cloudinary.com/de7hlbfce/image/upload/v1708860134/aquavigil/oohkgb05hi7b8kw81uo3.png" alt="workflow" />
<br/>

<h2>Website Capture</h2>
<img src="https://res.cloudinary.com/de7hlbfce/image/upload/v1708860541/aquavigil/tqecb4xk8vjkep6cex1a.png" alt="workflow" />
<br/>
<img src="https://res.cloudinary.com/de7hlbfce/image/upload/v1708860539/aquavigil/ejvt4cjeltu30f2e3hxs.png" alt="workflow" />
<br/>
<img src="https://res.cloudinary.com/de7hlbfce/image/upload/v1708860539/aquavigil/okuwoidxf7ehcpeyhvn6.png" alt="workflow" />
<br/>
<img src="https://res.cloudinary.com/de7hlbfce/image/upload/v1708860539/aquavigil/okuwoidxf7ehcpeyhvn6.png" alt="workflow" />
<br/>
<img src="https://res.cloudinary.com/de7hlbfce/image/upload/v1708860537/aquavigil/op0uy2okylcmwycoxhxx.png" alt="workflow" />
<br/>
<img src="https://res.cloudinary.com/de7hlbfce/image/upload/v1708860544/aquavigil/hebfetsh3r4ux1mowkrf.png" alt="workflow" />
<br/>
<img src="https://res.cloudinary.com/de7hlbfce/image/upload/v1708860544/aquavigil/qgss8ljcvfvtuinloxqs.png" alt="workflow" />
<br/>


## 4. Technology Stack
- Frontend: HTML5, CSS3, JavaScript (Next.js)
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Mapping and Geolocation: Google Maps API

## 5. Security
- Encryption of sensitive user data using industry-standard protocols.
- Role-based access control to ensure that only authorized personnel can access sensitive information.
- Regular security audits and updates to mitigate vulnerabilities and ensure data integrity.

## Conclusion
Aquavigil offers a comprehensive solution for managing water-related issues by providing a user-friendly platform for reporting, tracking, and resolving problems. With its robust features and secure infrastructure, Aquavigil aims to facilitate collaboration between citizens and authorities to ensure the efficient management and conservation of water resources.





This is a [Next.js](https://nextjs.org/) project bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying app/page.js. The page auto-updates as you edit the file.

This project uses [next/font](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
