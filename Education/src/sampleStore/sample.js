const courses = [
  {
    title: "Introduction to Web Development",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/1*fHrAZJ1_L0Ff9dvVexL5_A.png",
    description:
      "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
    language: "English",
    category: "Web Development",
    tags: [
      "HTML Basics",
      "CSS Styling",
      "Introduction to JavaScript",
      "Building a Responsive Webpage",
    ],
    level: "Beginner",
    rating: 5,
    teacherName: "Jane Doe",
    date: new Date(
      new Date().getTime() - Math.floor(Math.random() * 10000000000)
    ),
  },
  {
    title: "Mastering Python for Data Science",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZj8Xh1RTHBXtBAuOaNENG7OQiFROXR9vayA&s",
    description:
      "A comprehensive guide to using Python for data analysis and visualization.",
    language: "English",
    category: "Data Science",
    tags: [
      "Python Fundamentals",
      "Data Manipulation with Pandas",
      "Data Visualization with Matplotlib",
      "Machine Learning Basics",
    ],
    level: "Intermediate",
    rating: 3.7,
    teacherName: "John Smith",
    date: new Date(
      new Date().getTime() - Math.floor(Math.random() * 10000000000)
    ),
  },
  {
    title: "Digital Marketing Strategies",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRAiV1QsvtV4aEBAZkAUwqUDCevaMau2gstg&s",
    description:
      "Learn effective digital marketing strategies to grow your business.",
    language: "English",
    category: "Marketing",
    tags: [
      "SEO Basics",
      "Content Marketing",
      "Social Media Advertising",
      "Google Ads Optimization",
    ],
    level: "Advanced",
    rating: 4,
    teacherName: "Sarah Johnson",
    date: new Date(
      new Date().getTime() - Math.floor(Math.random() * 10000000000)
    ),
  },
  {
    title: "Graphic Design Essentials",
    thumbnail:
      "https://images.shiksha.com/mediadata/images/articles/1727952706phpexYyzb.jpeg",
    description:
      "An introduction to graphic design principles and tools for creating stunning visuals.",
    language: "English",
    category: "Design",
    tags: [
      "Design Principles",
      "Introduction to Adobe Photoshop",
      "Typography Basics",
      "Creating Social Media Graphics",
    ],
    level: "Beginner",
    rating: 4.6,
    teacherName: "Emily Davis",
    date: new Date(
      new Date().getTime() - Math.floor(Math.random() * 10000000000)
    ),
  },
  {
    title: "Mobile App Development with Flutter",
    thumbnail:
      "https://cdn.prod.website-files.com/5f841209f4e71b2d70034471/6078b650748b8558d46ffb7f_Flutter%20app%20development.png",
    description:
      "Build cross-platform mobile applications using Flutter and Dart.",
    language: "English",
    category: "App Development",
    tags: [
      "Flutter Setup and Basics",
      "Dart Programming",
      "Building UI Components",
      "Connecting to APIs",
    ],
    level: "Intermediate",
    rating: 4.6,
    teacherName: "Michael Brown",
    date: new Date(
      new Date().getTime() - Math.floor(Math.random() * 10000000000)
    ),
  },
  {
    title: "Introduction to Machine Learning",
    thumbnail:
      "https://xiengineering.com/wp-content/uploads/2023/10/AdobeStock_519767884-1-scaled.jpeg",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam delectus reprehenderit similique! Tenetur incidunt soluta odio suscipit voluptatem aliquam aliquid error, assumenda aspernatur porro dignissimos expedita hic numquam, animi ipsam inventore quo eveniet, consectetur earum iusto. Cum aliquam, quasi illo ex tempore repellat tenetur libero debitis, officiis quia impedit, rerum dolores eaque nostrum ipsum perferendis accusantium incidunt enim laudantium laboriosam dolore. Aspernatur tenetur, est iste assumenda quae placeat beatae ut ducimus? Enim odio id magni voluptas rem, at exercitationem nulla aperiam ab magnam atque dolor laudantium, iste in quis earum suscipit eos? Eos excepturi fugit mollitia magni unde cumque accusamus reiciendis cum! Cupiditate assumenda eligendi nulla repellendus. Officia, assumenda, nisi optio modi dolores consequuntur cumque ab aperiam quo animi minima, aliquid provident quidem possimus eos voluptatum. Nesciunt quam optio nihil maiores quidem dolorem dolore. Ullam earum esse voluptas nobis quod, harum minus excepturi repudiandae omnis autem odio exercitationem sint quia. Molestiae ea nihil sint a ratione nesciunt ut, natus facere. Ipsam maxime ratione et voluptas dolores aliquid recusandae inventore quidem voluptatem eligendi veritatis quam, dignissimos, animi perspiciatis sunt repellat illum accusamus. Vitae cupiditate incidunt quo id consequuntur dolor amet fugiat doloremque eos quaerat ullam rerum error cum maiores alias saepe repellendus laboriosam blanditiis ratione, doloribus libero. Sapiente, minima nam? Suscipit aspernatur odio optio ab alias adipisci sit! Repudiandae, eum eaque quo cum voluptas maxime ad pariatur, eius officia incidunt ipsum aliquid nostrum labore tempore.",
    language: "English",
    category: "Artificial Intelligence",
    tags: [
      "Understanding Machine Learning",
      "Supervised Learning Algorithms",
      "Unsupervised Learning Algorithms",
      "Model Evaluation",
    ],
    level: "Advanced",
    rating: 4.8,
    teacherName: "Laura Wilson",
    date: new Date(
      new Date().getTime() - Math.floor(Math.random() * 10000000000)
    ),
  },
];

export const defaultuser  = {
  name: "Dheeraj Verma",
  profilePic: "https://avatars.githubusercontent.com/u/161463894?v=4",
  email: "dheeraj.verma@example.com",
  interest: ["Technology", "Music", "Travel"],
  role: "admin",
  createdAt: new Date().toISOString(),
};

export const enrollments = [
  {
    _id: "67978797fa6a5f272eac7f58",
    courseId: {
      _id: "67978797fa6a5f272eac7f57",
      title: "Introduction to Web Development",
      thumbnail:
        "https://miro.medium.com/v2/resize:fit:1400/1*fHrAZJ1_L0Ff9dvVexL5_A.png",
      description:
        "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
      language: "English",
      category: "Web Development",
      tags: [
        "HTML Basics",
        "CSS Styling",
        "Introduction to JavaScript",
        "Building a Responsive Webpage",
      ],
      level: "Beginner",
      rating: 5,
      teacherName: "Jane Doe",
    },
    studentId: "67868887893f5848be381bfb",
    completed: false,
    completedAt: null,
    certificateUrl:
      "https://res.cloudinary.com/dzitsseoz/image/upload/v1738048243/StudyTube/Certificates/Dheeraj%20Verma-Web%20development-certificate.pdf",
    progress: 92,
    createdAt: "2025-01-27T13:18:15.936+00:00",
    updatedAt: "2025-01-28T07:10:44.215+00:00",
  },
  {
    _id: "67978797fa6a5f272eac7f51",
    courseId: {
      _id: "67978797fa6a5f272eac7f57",
      title: "Introduction to Data Science",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZj8Xh1RTHBXtBAuOaNENG7OQiFROXR9vayA&s",
      description:
        "Master Data Science from the basics and learn how to apply it in real-world scenarios.",
      language: "English",
      category: "Data Sceince",
      tags: [
        "Data Science Basics",
        "Data Analysis",
        "Data Visualization",
        "Machine Learning",
      ],
      level: "Beginner",
      rating: 4.7,
      teacherName: "Krish Naik",
    },
    studentId: "67868887893f5848be381bfb",
    completed: false,
    completedAt: null,
    certificateUrl:
      null,
    progress: 32,
    createdAt: "2025-01-27T13:18:15.936+00:00",
    updatedAt: "2025-01-28T07:10:44.215+00:00",
  },
];

export default courses;
