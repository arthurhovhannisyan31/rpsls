export const NotFound = () => {

  setTimeout(() => {
    throw "Hello";
  }, 1000);

  return(
      <div>
        <span>Not found</span>
      </div>
  );
};

NotFound.displayName = "NotFound";

export default NotFound;
