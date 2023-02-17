import dynamic from "next/dynamic";

const JoditEditor = dynamic(import("jodit-react"), {
  ssr: false,
  loading: () => <div>Carregando editor...</div>,
});

export { JoditEditor };
