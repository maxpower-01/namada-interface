import { ActionButton } from "@namada/components";
import { ConnectExtensionButton } from "App/Common/ConnectExtensionButton";
import { IbcLogo } from "App/Ibc/assets/IbcLogo";
import { routes } from "App/routes";
import {
  applicationFeaturesAtom,
  signArbitraryEnabledAtom,
} from "atoms/settings";
import { useUserHasAccount } from "hooks/useIsAuthenticated";
import { useAtomValue } from "jotai";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { KeplrAccount } from "./KeplrAccount";
import { NamadaAccount } from "./NamadaAccount";
import { SyncIndicator } from "./SyncIndicator";

export const TopNavigation = (): JSX.Element => {
  const userHasAccount = useUserHasAccount();
  const signArbitraryEnabled = useAtomValue(signArbitraryEnabledAtom);
  const { maspEnabled, namTransfersEnabled } = useAtomValue(
    applicationFeaturesAtom
  );
  const location = useLocation();
  const navigate = useNavigate();

  if (!userHasAccount) {
    return (
      <div className="w-fit justify-self-end">
        <ConnectExtensionButton />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center gap-4 sm:gap-6">
      <div className="hidden lg:flex gap-2">
        {maspEnabled && (
          <ActionButton href={routes.maspShield} size="sm" className="px-4">
            <div className="flex items-center gap-1">
              Shield Assets over <IbcLogo />
            </div>
          </ActionButton>
        )}
        {(maspEnabled || namTransfersEnabled) && (
          <ActionButton
            href={routes.transfer}
            size="sm"
            backgroundColor="white"
            className="min-w-[140px]"
          >
            Transfer
          </ActionButton>
        )}
      </div>

      <div className="flex-1" />

      <button
        className="text-2xl text-yellow hover:text-cyan"
        onClick={() =>
          navigate(routes.settings, {
            state: { backgroundLocation: location },
          })
        }
      >
        <IoSettingsOutline />
      </button>
      {signArbitraryEnabled && (
        <button
          className="text-2xl text-yellow hover:text-cyan"
          title="Sign Message"
          onClick={() =>
            navigate(routes.signMessages, {
              state: { backgroundLocation: location },
            })
          }
        >
          <AiOutlineMessage />
        </button>
      )}

      <SyncIndicator />

      <div className="h-[50px] flex gap-1">
        <NamadaAccount />
        <KeplrAccount />
      </div>
    </div>
  );
};
