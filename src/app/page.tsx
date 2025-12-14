import DevToPosts from "@/components/DevToPosts";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

async function getDevToPosts() {
  try {
    const devToUsername = process.env.DEVTO_USERNAME;
    if (!devToUsername) {
      return [];
    }

    const response = await fetch(
      `https://dev.to/api/articles?username=${devToUsername}&per_page=3&page=1`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Stackbyte Website",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map(
      (article: {
        id: number;
        title?: string;
        description?: string;
        url?: string;
        cover_image?: string;
        published_at?: string;
        reading_time_minutes?: number;
        public_reactions_count?: number;
        positive_reactions_count?: number;
        tag_list?: string[];
        tags?: string;
      }) => {
        const tagList =
          article.tag_list || (article.tags ? article.tags.split(", ") : []);

        return {
          id: article.id.toString(),
          title: article.title || "Untitled",
          description: article.description || "",
          url: article.url || `https://dev.to/${devToUsername}/${article.id}`,
          image: article.cover_image,
          publishedAt: article.published_at || new Date().toISOString(),
          readTime: article.reading_time_minutes,
          reactions:
            article.public_reactions_count || article.positive_reactions_count,
          tags: tagList,
        };
      }
    );
  } catch (error) {
    console.error("Error fetching dev.to posts:", error);
    return [];
  }
}

const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => null,
});

const Navbar = dynamic(() => import("@/components/Navbar"), {
  loading: () => null,
});

const About = dynamic(() => import("@/components/About"), {
  loading: () => null,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => null,
});

const FloatingElements = dynamic(
  () => import("@/components/FloatingElements"),
  {
    loading: () => null,
  }
);

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => null,
});

const MouseParticles = dynamic(() => import("@/components/MouseParticles"), {
  loading: () => null,
});

const MouseSpotlight = dynamic(() => import("@/components/MouseSpotlight"), {
  loading: () => null,
});

const NoiseOverlay = dynamic(() => import("@/components/NoiseOverlay"), {
  loading: () => null,
});

const Process = dynamic(() => import("@/components/Process"), {
  loading: () => null,
});

const ReadyToStart = dynamic(() => import("@/components/ReadyToStart"), {
  loading: () => null,
});

const SkillsShowcase = dynamic(() => import("@/components/SkillsShowcase"), {
  loading: () => null,
});

export default async function Home() {
  const posts = await getDevToPosts();
  const rawTeam: Array<{
    name: string;
    role: string;
    bio: string;
    photo: string;
    linkedin?: string;
    instagram?: string;
  }> = [
    {
      name: "Sharan Reddy",
      role: "Software Engineer",
      bio: "Leads delivery and quality with a focus on user impact.",
      photo: "/og-image.jpg",
    },
    {
      name: "Puneeth Venkata Sai",
      role: "Software Engineer",
      bio: "Builds robust interfaces and services with modern tooling.",
      photo: "/og-image.jpg",
    },
    {
      name: "Prakash Reddy",
      role: "Engineer",
      bio: "Focuses on performance and maintainable systems.",
      photo: "/og-image.jpg",
    },
    {
      name: "Ranjith Reddy",
      role: "Engineer",
      bio: "Delivers reliable features and clean code.",
      photo: "/og-image.jpg",
    },
    {
      name: "Keerthi",
      role: "Designer",
      bio: "Designs intuitive experiences and visuals.",
      photo: "/og-image.jpg",
    },
    {
      name: "Sonika",
      role: "Engineer",
      bio: "Builds user-first features across the stack.",
      photo: "/og-image.jpg",
    },
    {
      name: "Uday",
      role: "Engineer",
      bio: "Ships robust UI and API integrations.",
      photo: "/og-image.jpg",
    },
    {
      name: "Abhinav",
      role: "Engineer",
      bio: "Automates workflows and improves developer velocity.",
      photo: "/og-image.jpg",
    },
    {
      name: "Pavan Kumar Reddy",
      role: "Engineer",
      bio: "Ensures scalability and code quality.",
      photo: "/og-image.jpg",
    },
  ];
  const team = rawTeam.filter(
    (m, i, arr) => arr.findIndex((t) => t.name === m.name) === i
  );
  return (
    <>
      <NoiseOverlay />
      <MouseParticles />
      <MouseSpotlight />
      <Navbar />

      <main className="text-foreground selection:bg-primary/30 relative">
        <FloatingElements />
        <Hero />
        <About />
        <Process />
        <section className="relative py-24 sm:py-32" id="projects">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight gradient-animated-text">
                Projects
              </h2>
              <p className="text-gray-400 mt-4 text-base sm:text-lg">
                A selection of completed work.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  title: "Uninest",
                  description:
                    "Student housing platform connecting residents with community.",
                  image: "/og-image.jpg",
                  url: "#",
                },
                {
                  title: "Crama",
                  description:
                    "a billing and Ai powered management system for Clothing Industries",
                  image: "/og-image.jpg",
                  url: "#",
                },
                {
                  title: "Elevate Sense",
                  description:
                    "is an IoT and AI-based intelligent elevator system that detects real passenger presence before responding to a call, avoiding unnecessary stops.",
                  image: "/og-image.jpg",
                  url: "#",
                },
                {
                  title: "Pradakshana app",
                  description:
                    "Mobile-friendly devotional app with guided flows.",
                  image: "/og-image.jpg",
                  url: "#",
                },
              ].map((project) => (
                <div
                  key={project.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-transform hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-black text-white">{project.title}</h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 rounded-full border border-white/10 text-primary hover:border-primary/40 hover:text-secondary transition-colors"
                    >
                      View
                    </a>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <button className="inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10 text-sm px-6 py-3">
                Working to add more
              </button>
            </div>
          </div>
        </section>
        <SkillsShowcase />
        <section className="relative py-24 sm:py-32" id="team">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight gradient-animated-text">
                Our Team
              </h2>
              <p className="text-gray-400 mt-4 text-base sm:text-lg">
                The people behind Avasarams — building apps for seamless solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-transform hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 mb-4">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-black text-white">{member.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-gray-300">
                      {member.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <a
                      href={member.linkedin ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary cursor-pointer transition-colors transform hover:scale-110"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.instagram ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary cursor-pointer transition-colors transform hover:scale-110"
                      aria-label={`${member.name} on Instagram`}
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <ReadyToStart />
        <DevToPosts posts={posts} />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
