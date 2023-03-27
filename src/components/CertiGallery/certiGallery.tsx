import React from "react";
import Form from "../form/form";
import { WhatsappShareButton, EmailShareButton } from "react-share";
import { headingSizes } from "../../utils/Utils.fontSize";
import { getcertiIndi } from "../../utils/types";
import { assets } from "../../utils/utils.assets";
import { stylings } from "../../utils/utils.css";
import { updateAlias } from "../../utils/utils.dashboardIndi";
import { props } from "../../utils/utils.props";
import Popup from "../Popup/Popup";
import { PrimaryText, PrimaryBorder } from "../../utils/utils.primaryColor";
const CertificateGallery = React.memo(({ certiData, setAlias, setEditAlias, sharePopup, editAlias, onClose, alias, isClicked, setIsClicked, handleSubmit }: any) => {
	const [viewCertiPopup, setViewCertiPopup] = React.useState<{ link: string, status: boolean, alias: string }>({ alias: "", link: "", status: false });
	return (
		<div className="certificates_sub1_container_DBID rounded-lg bg-white flex pt-[1rem] flex-col justify-start items-center gap-y-[1rem]">
			<h1 className={`${headingSizes.h4} text-sky-900`}></h1>
			<div className="card_grid_sub2_container_DBID justify-start gap-x-[10%] flex flex-wrap rounded-xl overflow-scroll w-[100%]">
				{certiData?.map((_: getcertiIndi) => (
					<div className="sub3_container_DBID flex flex-col rounded-lg temp">
						<span
							id={_.CID}
							className={`${headingSizes.h4} w-[100%] font-medium text-center ${PrimaryText[900]}`}
							onClick={(e: any) => {
								setAlias({ CID: e.target.id, alias: "" });
								setEditAlias(true);
							}}>
							{_.aliasName ? _.aliasName : "enter alias"}
						</span>

						{sharePopup.status ? (
							<>
								<Popup height="auto" width={window.innerWidth >= 900 ? "60vw" : "80vw"}>
									<div>
										<Form
											fields={[]}
											label="Share Your Achivements"
											headingProps={props.headingProps}
											isPopup={false}
											onClose={onClose}
											level2PrimaryProps={{
												className: `${stylings.level2PrimaryCss} bg-transparent border-[0px]`,
											}}
											level1PrimaryProps={props.level1PrimaryProps}></Form>
									</div>
								</Popup>
							</>
						) : (
							<></>
						)}

						{editAlias ? (
							<Popup height="auto" width={window.innerWidth >= 900 ? "40vw" : "80vw"}>
								<Form
									fields={updateAlias(alias, setAlias)}
									headingProps={props.headingProps}
									label="Edit Alias"
									isPopup={false}
									onClose={onClose}
									level2PrimaryProps={{
										className: `${stylings.level2PrimaryCss} bg-transparent border-[0px]`,
									}}
									level1PrimaryProps={props.level1PrimaryProps}
									submitLabel="Submit"
									isClicked={isClicked}
									submitProps={{
										className: `${stylings.primaryButtonCssDark} w-full`,
										disabled: isClicked,
										onClick: () => {
											setIsClicked(true);
											handleSubmit("upload/alias", alias);
										},
									}}
								/>
							</Popup>
						) : (
							<></>
						)}

						<div onClick={() => {
							console.log("clicked")
							setViewCertiPopup({ link: _.Link, status: true, alias: _.aliasName });
						}} className="card__container_sub4_container_DBID">
							<div>
								<img src={_.Link} alt="" className="front" />
							</div>
							<div className="back">
								<div className="flex items-center justify-center ">
									<WhatsappShareButton url={_.Link}>
										<button className="text p-0 m-0">
											<img className="cetiIcons" src={assets.Share} alt="img" />
										</button>
									</WhatsappShareButton>
									<button className="text" onClick={() => window.open(_.Link)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											version="1.1"
											xmlnsXlink="http://www.w3.org/1999/xlink"
											width={24}
											height={24}
											x={0}
											y={0}
											viewBox="0 0 24 24"
											xmlSpace="preserve"
											className="cetiIcons">
											<g>
												<g transform="translate(-216.731 -90.903)">
													<path
														d="m227.731 92.903h-5c-2.209 0-4 1.791-4 4v12c0 2.209 1.791 4 4 4h12c2.209 0 4-1.791 4-4 0-2.271 0-5 0-5 0-.552-.448-1-1-1s-1 .448-1 1v5c0 1.104-.896 2-2 2-3.33 0-8.671 0-12 0-1.105 0-2-.896-2-2 0-3.33 0-8.671 0-12 0-1.105.895-2 2-2h5c.552 0 1-.448 1-1s-.448-1-1-1zm7.586 2h-3.586c-.552 0-1-.448-1-1s.448-1 1-1h6c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1s-1-.448-1-1v-3.586l-7.293 7.293c-.39.39-1.024.39-1.414 0-.391-.39-.391-1.024 0-1.414z"
														fill="#000000"
														data-original="#000000"
													/>
												</g>
											</g>
										</svg>
									</button>
									<EmailShareButton url={_.Link} subject={"Check out this certificate"} body={_.Link}>
										<button className="text p-0 m-0">
											<img className="cetiIcons" src={assets.Email} alt="img" />
										</button>
									</EmailShareButton>
								</div>
							</div>
						</div>
					</div>
				))}
				<div className="onlyForTabletAndMobile">


					{viewCertiPopup.status && <Popup props1={{ className: "popCss" }} height="auto">
						<div className="w-full p-[2rem] flex flex-col h-fit items-center justify-center gap-[3rem] ">
							<svg
								width={20}
								height={20}
								className="absolute top-8 right-8 cursor-pointer text-white z-10 "
								viewBox="0 0 320.591 320.591"
								onClick={() => { setViewCertiPopup({ link: "", status: false, alias: "" }) }}>
								<path
									d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z"
									fill="#000"
								/>
								<path
									d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z"
									fill="#000"
								/>
							</svg>
							<span className={`text-[4rem] ${PrimaryText[900]}`}>{viewCertiPopup.alias}</span>
							<img className="w-[60vw]" src={viewCertiPopup.link} alt="img" />
							<div className="activity flex items center w-full justify-center gap-[3rem]">
								<button className={`flex-1 rounded-md ${headingSizes.h4} border-[0.3rem] ${PrimaryBorder[900]} flex items-center justify-center gap-x-[1rem] bg-transparent ${PrimaryText[900]} py-[0.5rem] px-[1rem] text-center`}><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 409.6 409.6" xmlSpace="preserve" className="w-[2rem]"><g><path d="M307.2 204.8c-30.715 0-58.199 13.583-76.964 35l-64.998-40.003c3.328-9.134 5.432-18.852 5.432-29.133 0-6.717-.963-13.179-2.432-19.466l86.4-39.869c12.513 15.268 31.278 25.201 52.567 25.201 37.683 0 68.265-30.566 68.265-68.265S344.883 0 307.2 0c-37.714 0-68.265 30.566-68.265 68.265 0 4.163.517 8.182 1.213 12.15l-86.298 39.834C138.301 99.164 113.516 85.33 85.335 85.33 38.2 85.335 0 123.53 0 170.665 0 217.8 38.2 256 85.335 256c24.53 0 46.5-10.501 62.065-27.1l64.901 39.936c-4.803 11.863-7.501 24.781-7.501 38.364 0 56.566 45.834 102.4 102.4 102.4 56.535 0 102.4-45.834 102.4-102.4s-45.865-102.4-102.4-102.4z" fill="#008080" data-original="#000000" className=""></path></g></svg> share</button>
								<button className={`flex-1  rounded-md ${headingSizes.h4} border-[0.3rem] ${PrimaryBorder[900]} flex items-center justify-center gap-x-[1rem] bg-transparent ${PrimaryText[900]} py-[0.5rem] px-[1rem] text-center`}><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 612 612" xmlSpace="preserve" className="w-[2.5rem]"><g><path d="m403.939 295.749-78.814 78.833V172.125c0-10.557-8.568-19.125-19.125-19.125s-19.125 8.568-19.125 19.125v202.457l-78.814-78.814c-7.478-7.478-19.584-7.478-27.043 0-7.478 7.478-7.478 19.584 0 27.042L289.208 431c4.59 4.59 10.863 6.005 16.812 4.953 5.929 1.052 12.221-.382 16.811-4.953l108.19-108.19c7.478-7.478 7.478-19.583 0-27.042-7.498-7.478-19.604-7.478-27.082-.019zM306 0C137.012 0 0 136.992 0 306s137.012 306 306 306 306-137.012 306-306S475.008 0 306 0zm0 573.75C158.125 573.75 38.25 453.875 38.25 306S158.125 38.25 306 38.25 573.75 158.125 573.75 306 453.875 573.75 306 573.75z" fill="#008080" data-original="#000000" className=""></path></g></svg> download</button>
							</div>
						</div>
					</Popup>}
				</div>
			</div>
		</div>
	);
});

export default CertificateGallery;
