import { CustomButtomProps } from "@/types";
import Image from "next/image";
import { saveData } from "@/constans/saveCartData";

const CustomButtom = ({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
}: CustomButtomProps) => {

  const handleButtonClick = () => {
    if (title === "Logout") {
      console.log("kayıt atılıyor");
      fetchCarData();
    }
    handleClick;
  };

  const fetchCarData = async () => {
    /* const carData = await saveData(); */
  };

  return (
    <div>
      <button
        disabled={false}
        type={btnType || "button"}
        className={`custom-btn ${containerStyles}`}
        onClick={handleClick}>
        <span className={`flex-1 ${textStyles}`}>{title}</span>
        {rightIcon && (
          <div className="relative w-6 h-6">
            <Image
              src={rightIcon}
              alt="right icon"
              fill
              className="object-contain"
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default CustomButtom;
