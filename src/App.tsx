import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Mushroom } from "./components/Mushroom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { GiMushroomGills } from "react-icons/gi";
import { HiBeaker } from "react-icons/hi2";
import { TbAlertTriangle } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const modalContent = [
    {
      img: "https://kuban24.tv/wp-content/uploads/2023/12/photo_2023-12-09_11-05-01.jpg",
      title: "Морфология сморчка",
      icon: "Mushroom",
      facts: [
        "Шляпка: яйцевидная или коническая, с ячеистой структурой",
        "Ножка: полая, белая, хрупкая",
        "Высота: 5–15 см",
        "Сезон: март–май (весенний гриб)",
      ],
      color: "from-amber-600 to-yellow-500",
    },
    {
      title: "Химический состав",
      icon: "Beaker",
      facts: [
        "Содержит полисахариды с иммуномодулирующим действием",
        "Присутствует гидразин (токсин, разрушается при варке)",
        "Богат витамином D (при УФ-облучении)",
        "Аминокислоты: глутамин, аргинин, лейцин",
      ],
      color: "from-purple-600 to-pink-500",
    },
    {
      title: "Токсичность и приготовление",
      icon: "AlertTriangle",
      facts: [
        "Сырые сморчки — токсичны (гемолизины, гидразины)",
        "Обязательна термическая обработка: 15–20 мин варки",
        "Отвар сливать! Не употреблять в пищу сырыми",
        "После варки — безопасны и вкусны",
      ],
      color: "from-red-600 to-orange-500",
    },
  ];

  function handleOpenModal(index: number) {
    setModalIndex(index);
    setOpenModal(true);
  }

  function handleClose() {
    setOpenModal(false);
    setTimeout(() => setModalIndex(null), 400);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <AnimatePresence>
        {openModal && modalIndex !== null && (
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute left-0 top-0 h-full w-full max-w-[500px] bg-black backdrop-blur-xl border-r border-zinc-800 z-20 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <motion.div
                key={`header-${modalIndex}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <div>
                  {modalContent[modalIndex].icon === "Mushroom" && <GiMushroomGills color="#ba9e88" size={32} />}
                  {modalContent[modalIndex].icon === "Beaker" && <HiBeaker color="#8d2cff" size={32} />}
                  {modalContent[modalIndex].icon === "AlertTriangle" && <TbAlertTriangle color="#ff0000" size={32} />}
                </div>
                <h2 className="text-xl font-medium tracking-wider text-white">
                  {modalContent[modalIndex].title}
                </h2>
              </motion.div>
              <button
                onClick={handleClose}
                className="group p-1.5 rounded-full text-white hover:text-black bg-black hover:bg-white transition-all duration-200"
              >
                <IoCloseSharp className="w-5 h-5" />
              </button>
            </div>

            <motion.div
              key={`content-${modalIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex-1 overflow-y-auto p-6 space-y-6"
            >
              {modalContent[modalIndex].img && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="overflow-hidden rounded-lg shadow-2xl"
                >
                  <img src={modalContent[modalIndex].img} alt={modalContent[modalIndex].title} className="w-full h-auto object-cover" />
                </motion.div>
              )}

              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
                  },
                }}
                className="space-y-4"
              >
                {modalContent[modalIndex].facts.map((fact, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-start gap-3 text-zinc-300"
                  >
                    <span className="mt-1.5 text-white/50">▹</span>
                    <span className="leading-relaxed">{fact}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {modalIndex === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 }}
                  className="p-4 rounded-lg bg-white-950/30 border border-white backdrop-blur-sm"
                >
                  <p className="text-sm italic text-white">
                    при анализе — используется HPLC для определения гидразинов.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ x: openModal ? 250 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="h-screen w-full flex flex-col"
        style={{
          background: "radial-gradient(circle, rgba(46,46,46,1) 0%, rgba(0,0,0,1) 50%)",
        }}
      >
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Canvas
              shadows
              camera={{
                position: isMobile ? [0, 0, 6] : [0, 0, 4],
                fov: 50,
              }}
              gl={{ preserveDrawingBuffer: true }}
              className="w-full h-full"
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={2048} />
              <Suspense fallback={null}>
                <Mushroom handleOpenModal={handleOpenModal} />
              </Suspense>
              <OrbitControls enableZoom={false} />
              <Environment preset="city" />
            </Canvas>
          </div>
        </div>
      </motion.div>


      <Link className="absolute right-[20px] bottom-[20px] cursor-pointer" to={"https://azicode.ru"}>
        <img src="/azi.svg" className="w-[30px] opacity-45 hover:opacity-100 transition-opacity" />
      </Link>
    </div>
  );
}