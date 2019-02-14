import Platform from "../services/Platform";

export default function(router) {
  Platform.registerBackButtonAction(event => {
    event.preventDefault();
    router.back();

    return false;
  }, 101);
}
