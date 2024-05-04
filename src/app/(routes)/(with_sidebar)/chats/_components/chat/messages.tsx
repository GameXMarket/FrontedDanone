import styles from "./chat.module.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";

interface MessageProps {
    date: number;
    name?: string;
    text: string;
    files?: string[];
}

export const RightMessage = ({ text, name, date, files }: MessageProps) => {
    return (
        <>
            <div className={styles.message_right}>
                <div className={styles.msg_right}>
                    <div className="flex flex-col w-[90%]">
                        <div className="w-full pt-3 flex flex-col ml-2">
                            <h4>{name}</h4>
                            <p className="pb-2">{text}</p>
                            {files && (
                                <div className="mb-2">
                                <Image
                                    className="rounded-[24px]"
                                    src={files[0]}
                                    alt="msg file"
                                    width={340}
                                    height={420}
                                />
                                </div>
                            )}
                        </div>
                        <div className="w-full flex justify-end">
                            <p className="text-[16px] opacity-[0.16] py-1 ml-2">
                                {dayjs
                                    .unix(date)
                                    .format("DD.MM, HH:mm")
                                    .toString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="back-gradient self-end w-fit mobile:flex flex-col gap-y-2 ml-2 mobile:px-[4px] mobile:py-[8px] mobile:ml-0 rounded-l-[20px] rounded-br-[20px]">
                <p className="pb-2 mobile:pb-0 mobile:text-[16px] mobile:font-light mobile:leading-[16px]">{text}</p>
                {files && (
                  <div className="mb-2">
                  <Image
                      className="rounded-[24px]"
                      src={files[0]}
                      alt="msg file"
                      width={340}
                      height={420}
                  />
                  </div>
                )}
                            <div className="w-full flex justify-end">
                            <p className="text-[13px]">
                                {dayjs
                                    .unix(date)
                                    .format("DD.MM, HH:mm")
                                    .toString()}
                            </p>
            </div>
            </div>

        </>
    );
};

export const LeftMessage = ({ text, name, date, files }: MessageProps) => {
    return (
        <>
            <div className={styles.message_left}>
                <div className={styles.msg_left}>
                    <div className="flex flex-col w-[90%]">
                        <div className="w-full pt-3 flex flex-col gap-y-2 ml-2 mobile:px-[24px] mobile:py-[16px] mobile:ml-0">
                            <h4 className="mobile:hidden">{name}</h4>
                            <p className="pb-2 mobile:pb-0">{text}</p>
                            {files && (
                                <div className="mb-2">
                                <Image
                                    className="rounded-[24px]"
                                    src={files[0]}
                                    alt="msg file"
                                    width={340}
                                    height={420}
                                />
                                </div>
                            )}
                        </div>
                        <div className="w-full flex justify-end">
                            <p className="text-[16px] opacity-[0.16] py-1 ml-2">
                                {dayjs
                                    .unix(date)
                                    .format("DD.MM, HH:mm")
                                    .toString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#24252F] pt-3 hidden mobile:flex flex-col gap-y-2 ml-2 mobile:px-[24px] mobile:py-[16px] mobile:ml-0 rounded-r-[20px] rounded-bl-[20px]">
                <h4 className="mobile:hidden">{name}</h4>
                <p className="pb-2 mobile:pb-0 mobile:text-[16px] mobile:font-light mobile:leading-[16px]">{text}</p>
                {files && (
                    <div className="mb-2">
                    <Image
                        className="rounded-[24px]"
                        src={files[0]}
                        alt="msg file"
                        width={340}
                        height={420}
                    />
                    </div>
                )}
                <div className="w-full flex justify-end">
                            <p className="text-[16px] opacity-[0.16] py-1 ml-2">
                                {dayjs
                                    .unix(date)
                                    .format("DD.MM, HH:mm")
                                    .toString()}
                            </p>
                </div>
            </div>
        </>
    );
};

export const AdminMessage:FC<PropsWithChildren<{text: string}>> = ({text}) => {
    return (
        <>
            <div className={styles.admin_msg}>
                <p className="text-white opacity-[0.16] font-light max-w-xs">{text}</p>
            </div>
        </>
    )
}