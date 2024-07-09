// app/cms/page.tsx
import Cms from "@/components/cms/cms";
import Header from "@/components/Header";

const CmsPage = () => {
  return (
    <main className="font-poppins">
      <div className="w-full text-blue-950">
        <Header />
        <Cms />
      </div>
    </main>
  );
};

export default CmsPage;
