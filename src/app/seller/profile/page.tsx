import PageTop from "@/components/native/PageTop";

const getSellerData = async (userId?: string) => {
  // return await getData<ProfileType>(
  //   `${siteConfig.BACKEND_URL}/api/admin/get/${userId}`,
  //   true,
  //   10
  // );
};

export default async function SellerProfile() {
  return (
    <>
      <PageTop title="Seller Profile" />
      {/* <ProfileUI data={seller} showBalance={true} /> */}
    </>
  );
}
