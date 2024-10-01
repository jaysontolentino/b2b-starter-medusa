import { checkSpendingLimit } from "@lib/util/check-spending-limit"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import ItemsTemplate from "./items"
import Summary from "./summary"
import { Customer } from "types/global"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: Customer | null
}) => {
  const spendLimitExceeded = checkSpendingLimit(cart, customer)

  return (
    <div className="py-12 bg-neutral-100">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div>
            <div className="flex flex-col py-6 gap-y-6">
              <div className="pb-3 flex items-center">
                <Heading className="text-neutral-950">
                  You have {cart?.items?.length} items in your cart
                </Heading>
              </div>
              <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-2">
                <div className="flex flex-col gap-y-2">
                  {!customer && <SignInPrompt />}
                  <ItemsTemplate cart={cart} />
                </div>
                <div className="relative">
                  <div className="flex flex-col gap-y-8 sticky top-20">
                    {cart && cart.region && (
                      <Summary
                        cart={cart as any}
                        spendLimitExceeded={spendLimitExceeded}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
