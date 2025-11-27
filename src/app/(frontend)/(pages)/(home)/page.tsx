import UploadDropzone from "../../features/UploadDropzone";
import FPS from "../../shared/components/FPSCounter";

export default function Home() {
  return (
    <div className="p-8 bg-black-500 h-full min-h-screen">
      <FPS />
      <UploadDropzone />
    </div>
  );
}
