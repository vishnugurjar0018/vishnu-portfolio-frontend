
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";

export const metadata = {
  title: "Vishnu Gurjar | Creative Designer & Developer",
  description:
    "Explore my portfolio, creative designs and web development projects.",
  keywords: [
    "Vishnu Gurjar",
    "VK Creations",
    "Graphic Designer",
    "Full Stack Developer",
    "Web Developer",
    "Portfolio",
  ],
};

export default function WebsiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#171321]">
      {/* Website Header - Common on all website pages */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Website Footer - Common on all website pages */}
      <Footer />
    </div>
  );
}
