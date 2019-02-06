import Platform from "../utils/Platform";

export default function(router) {
  Platform.registerBackButtonAction(event => {
    router.back();
  });
}
