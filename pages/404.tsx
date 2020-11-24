import Error from "./_error";

export default function Custom404() {
  return <Error message="Not Found" statusCode={404} />
}
