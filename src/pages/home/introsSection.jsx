import { FiBookOpen, FiPlus, FiLayers, FiDatabase } from "react-icons/fi";
import {
  AiOutlineClockCircle,
  AiOutlineFileText,
  AiOutlineUser,
} from "react-icons/ai";
import React from "react";
export default function IntroSection() {
  return (
    <div className="bg-white">
      {/* Section 1 */}
      <div className="flex flex-row container mx-auto px-4 py-16 mt-10 h-100 bg-[url('/images/image.png')] bg-local bg-no-repeat bg-cover">
        <div className="text-start justify-items-start mt-30 ml-20 ">
          <p className="text-sm text-gray-600 mb-2">
            Tài liệu gọn gàng, trích dẫn sẵn sàng
          </p>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">VUniBox</h1>
          <p className="text-gray-600">
            Nâng tầm nghiên cứu với nền tảng lưu trữ và trích dẫn toàn diện.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full">
              Về chúng tôi
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full">
              Bắt đầu ngay
            </button>
          </div>
        </div>
        <div className="flex justify-items-end ml-130 h-80">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTEhMVFhUXFRYVFhgYFxgVFxcVFRUXFhUXFRUYHSggGBolHRUXITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGysfHSUtLS0tLSsrLy0rKy0tLTUtKystLS8tKy0tKy0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLf/AABEIALoBDwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYABwj/xABFEAACAQIEAwUFBAcGBQUBAAABAgMAEQQSITEFQVEGEyJhcTKBkaGxI0JSwQcUYnKS0fAzU2OCg+EVc5OiwiQ0Q7Lxw//EABoBAAIDAQEAAAAAAAAAAAAAAAABAgMEBQb/xAAxEQACAgECAwUGBgMAAAAAAAAAAQIRAwQhEjFBBRMyUZEUImGBoeFCUnGx0fAGFcH/2gAMAwEAAhEDEQA/ANhg+CiDiCSAzyCWF8zvLI4E0RUAst8vijkYbWHdCwF60QwUYk70KA2Vl00uGZWJI5m67+Z61MKdSASWMMpU7EWPLSu7peQt6afMU8V1MAaaDUEX311vpYj7wN99q44bTQj01APrY2+AqdqctIAVAUsWAsSF0JbcgL90XF/hfyouh8Zj4ord5IqlvZBPiY9ET2mPkAarcZx4oA4w8pQlbu9ovDq0jLG/2l0RWchlW4U2JOlMC4oppwkbOQxCqWIVS7EAXIVFBLHyAuaF51FxbtBhcHH3mKmSJeWY6sRuEQXZj5AGhAZrhnEuJY1ZMU7nh2FQOY0aJWxDhAT3k5mUrGml7KL766Am2/Rz2gkx/D4cTMoV2zq2UEKSjsmZQdgbfG9ZfiPFZOMFoe8GC4eJRFKZHWPFYlyMywrGTeFWAv4tWFtCLipe2mKngxHDOGYD7FHkzfZuVbuIF8cZBW2oLG5JuVF6AN/xDHwwJnnljiS9s0jrGtzsMzEC9PwuKjlQPE6ujaqyMHUjyZdDWK/SDBhYHi4timYth4ykGGbKyNiHuUyqL/aXtci4AQH7t6d+jnhr8P4dnxYk72aVsTKqRySsjTZQF7uJS17KpOmhJ6UwN1JtQsG9RcO4vHPcRiYEC/2mHng+HfIub3Vlux3aWbG4zFmMJ+pQsIY3sS8kwsXYNe2QDy2ZPOgRuRS0gpaAIu5GUrrY5r9fEST9TUigcuVdWYWFV4u9x/7jBIwOxzYWZlezDX2cTH8KANPXWqg4tNklWFMygwyStKe9kVCrIkaBQwzOzSEhb3IQgAk6T8FgMuHjOKjj74oveoD3irIR4l8TNa3S59TvQBbq4NwCCRobHY+fSqDisd8Xhidsk6+95MMBV7BAiLlRVVeigKPgKpuNaS4Y9ZcnxKt/4fKgCbswfsSP8WQ/xnvP/OreqTsq3hmH4ZIx8cJhn/8AKrykMpON4GRpYpQ6iOM5mDXXLkDtmDhtMzd2reE+AONAxrNdlsLPl727ZCuVFlEgcobSIzh7XsWIAsLXezMCLbzERK6srAFWBVgdQVIsQR0IoGYa0CK1JX7ss6WYA6XWxsL3HjsB6sNuVVHDMVJJFmDG88rGM3DiOPKC1uRtlYAW0ZgDfUnSEUG2EUAZPCVRkTmFBy8ufsL/AEaQytTGmSbLEY2iUeNg2Y5iCQEseXhv1zHUZdT8tUcXAGZkM+VwoJPiLGRiVIMgKDMRlHivsLW3JtcVBlR2jBDkfcC5mI9lbsrC3K5GlyaQx+GdXCuBuPCSLHKbai+oBsD8KbBhYWCOqIfAoRsouEt4QCRcCx+dV/DsXlifKQ2VzHCot4mtmQAgAagi4CjJZgfZNosY0sMZSPNm8McZOwjiWMeFLHMxLOdBte58IoEalR1p9MhDW8W9z8Lm3ytUtqYCUPjcdHEAZHC5myrfdmsTlVRqzWUmw6GirUCq95Iz8o7pHvYyXBkbQ6gEBPdINjTAHbiEr/2OHa2njmPcLY72SxluOjIt+vRw4dK/9tiGtr4IR3C2O3jBMtx1V19Ksr3AOuvXQ+8UJieKwxtkL3cWPdoGlksdj3cYLAedrUASYPh8UV+7jVS3tEDxMdru27HzJNRQqJHdyLquaJRyOv2x97AJ/pn8VD4rF4pkcwwZLK1jK65yQDlyRpmGv7TLbmOVWGDCd2nd+xkXJzuthlN+elqABeEse7CMSWjJiYnc5NFY+bLlb/NViOGwO6SvDE0iexIyKzp+45F13OxqvQZMQRylTN/nisrEnqVaO3lGau8PtQBT8a7I4LFSJLPAryIyMGuykmM3TPlIDgXOjX3PWrSbARPIkrxo0kebu3ZVLpmFmyMRdbjQ23ommySBRc7afM2piMpjuxfeY1Ma87TSRn7KKdVaGIEg/ZKmXLJcC0hzeYJAIt34YZ0tiwuYMSpheWMqD0kVlcH0NWppL0AUXEOzzfqs8GGxE0bSpkDyyS4nu76MU7yTMCVJF82hseVq80n4DLhcTwrhKYlu4aR5nZV7l2aIM8i94jXKtdgAdRpqdLe0ttVJxLHxxeJlDMDddNQeoPKk2krY0m3SLsUtYjD9vLymNobCxIa9rW6i+1Oj7ayX/skYfvlT9CPpVffQ8yzuZ+RtbVh+JcRYY3B98oWaLEtC2X2ZcNi4pBHIl7nKZIogy3urIRqLFr3g3aaDENkBKSfga2v7rA2b038qPx3CoJmieWNXeF88TEao3VT8NNtB0qxNNbFbTWzK98STiGjxOGJRWzYaVUMyEFAGz2BMUgJcXIAKkWO9P4ZwgJisRicqp3yQxhAALiHvDne2mY96RzsqLrqQLiupiFqg7Qmz4Q9MUCfQYedvyFX9ZntvM0eH71FDtG+YKb6/ZyLYZQTezaAA3NqADuzos2JH+Mv/AGwRR/8A86uazXY/EySGR5VjUypFOojZpFCTGUp42VcxsOgrS0hiNQE+9HtQE+9PoIiIqNhVV2k4xJAETDwGeeXOI4wyrbItzI+ZhaMeEE3GrKL3YVnuy0qpj50ZZklkw+HMnfKA8syvimZi0ZaMeAqFUNYKth7JtEZsHFIBSSyqGCFhmIZgt9SqlQxA5gF1BP7Q609aQDbU61KKWgBmFhlDXdgRY6A3sSQfwi+x1Pl1NG11LUgAONcQEEebxFmYRxhUeQ94/skogJIFix8lNQYd58oSKERqBYPOwZtPvd1ETnvuczodaN4nAXiYL7YsydO8jIeO/lmVb+VTYadXRXX2XUMvowuPkaAKxeFliRNNJJY3yKe5j1/YjOZlJzaSM2xqwwmGSNQkaKijZUUKvwGlOl0IPXwnYfuna510t+0aeKAFoHhfhDxf3bkL/wAtvHHYdAGyf6Zo+q6eUJiEI17wdywGpDqDLFmt7Iy99qfxLQI7i/hQS/3TCU/uAFZfX7NnsOtquMJKDcA3ynKfWwNvPQiqniErCNrCxICqDYku5yhSLEAG4udbC5tpVjwbBrDCkSkkKtrnUsd2ZidySST5k0DDqFxgureQ+Z/2+tTyyBRc/wBE6AfGoJmGQi4JO9jzO/upgLhJLqL7/Uf1/WtTNQCyFSP6Gu4o9WBFxqKBEOLnyr58qynEBm31O5H8z/X51e8Qm3Pw8uprPY2UIrM2gGp6novr1+FZM0rZqwxoymLw1p3Jy/2TE2vtcAXJ319NqG4ZKuvy/wBrgE+69Gl2kZpMtjkfTnbL974bVTYWLKrWNueU6r62/P6VQtzTVAvF2tJmVmVgbgjQgjmLV6h+j3tU2KQxTf2yC9/7xNs3r19Qa8Yx+Lu5FrHmN/eOv1q47HcUMOJie+mYX9G0PuINvUjzqzHJwZXkipI9/rhXXrr1uMAtDzQI4KOoZTuGFwfcaIrGdvu00uFURYVQ2JkU92DY665bKdCfC7XOgWJuZFAGpwsEUIVFsuY2W7Es7BSbXYlmIVT1sF6Ci68w4CuKbD99Nh8RNJfQzPEJO9DqGSM5rKrMrL7Kqo/Fckw9mO3EqcQxGHxYEKqyoIma7KBYGVWLm97hyoBAXMc/hAZDPVDQM+9HGgMY1gTa9ht18hTECLhUEjShRnZVQtzyqSVXyF2JsOZoXA4ApLiJGbMZpFYaWyokSIqefiV2/wA9Ho4IuDcVxpDKY8FjGIOJBIfKqWUlVsM5bMo0fMXBJIv4F6VYrTpKRaQAkmLIkIFsqRl23JuWIFiL7ZH0sTe1Sw4tWXNZrXI9ljqpKnQC9rg621qH/hi53cMwLlCRcZbIGGXLaxU53JBvq19CAQXh4AgIBJuS2vUnYAaAeX53NAE2MxccSl5XSNBuzsFXXYXPOhIONwsWF2W1rFkZQ62vmS41AOZfVTysT5rjYcRxHHsRNEpw8pRYpVz5s/iBRNhljAPM51dtNLajj3A8W8UsWGxQVxCuW6EFiTKAmdpCVFsw8Wb278hTA2MTBgGUgg7EG4PoaF4Z4TJF+Byy/wDLlu6+gDF0HlHWE/RT2kLBcFIGDrFmFyXF1a2j5m9oXOW+hjewAIA3eIGSaN+Tgwt62MkZJ6DLIvrKKACcT7JPTXnuNRtruKRHYjRcu3tWProp92/+6uLt5DXnqeXrbX4jpSyzKilnZVUalmIVQPMnQUAJ3X4iW9rfazciosCOWoP1qDicRMRCDxLZ4wNLvGQ6L5AlQvoTUI4wr/2Eck37SjLHY8xLIVV1/czHypBDin9uRIR0iHeOP9WVcvu7v30COw8omkEim8aAFDyZ5FBzD91GAv8A4jDlV7h9qp+F8Njw6d3Fmy5i3idn1Y3NsxOUX1sLDyq3w+1AyYikIvoaWmuwGpIGoGumpNgPUkge+mA69QzNYVLQ2L2HrUZOkEd2VHEJbe4fE7D51luJK0k0eGVrAL3krDclibKOmx+Qq8kmuxPLvCPcvht8mNVGBH/qXcnUhb/CudOW50sUdi2w/C0Rcovbnck1muOcD37vw/StejXGhqDExAixqTXkCfmeJcZwLI1nUjoRt6im8JkN7Hca+VvvW8iDf416Px7CoEOYaedvzrBxQIGDxkFbi46KTYgX5an40lK1TG49UfQPA8T3mHifm0ak+thf50ZVP2Q/9rGPw3HzJ/OroCuhB3FM5s1UmjhWJ/SJ2amxCrPhGZcRELrlIVmADgBSQRfLJKv+pfUrZtuaoO1GCxkqD9SnEMiknWwD6WUMxjey31NlueoqRER+IRKqI8iBw0R8ThGYFgCxW+hBNiNwR6Vme33ZuDGq7Zc0rFI4QGLLKYsxsCLlReR1MlrKFNzYCoMdjcVGyrxHC4pkDqwmhkjZLo6lToAVHUFlJ1FiDr6BwbuDEsmHRVR1BGVAmnQgDQg30pDC41soBNyABfrYb0FjPzH1FWBqvxjC49T8h09SKYiuTwsw5b+VjqB8/wD9opWuKilQlgQNLWv8T/OuTD2+8eXTYcqQzp3CgsxAABJJ0AAFyT5VBHjEIBUlgRcFVZ1IOxDKCDXN9o37Cn+J1O/7qke9h+zrG0LKSYtr3dL2BvuUP3HO9tjzsTmpATwYlWJUXBGtmBUkfiAO4vpeiBQgCSrpcZT+68bAfFTY+hB5g68uIKaS2tyk2U+T/gb5HlYnKACpxfAcOmNGMV41kCujqWVTd7tnW5FmzMTY6HO3lUsPHs0rqqP3ndxgBckoFmku7ZCxyAsLnfluReLinY2KaVpVklhnJDF0IOewVRnBFyLIFIDDa+l6j4Xh+J4eRVlMOJiLKudIxHIql7FnGYWAU3+97G9yKYg7A8F/9UuIy5RHAIVJ9uSxOVmXXIFDPzuxlOYDIt7XisDPE4S2ewaO+3eIQ8d/LMq0XXUAVAw2KYeORIRzEQ7x73uT3sq5dend6cjU2H4RCrByudwbh5CZXUnfIzk5B5LYUe1KtAzia6lpDQIYTrRuH2oDnU0MrOLR6DnJuP8ATH3j57D9qxFAwifEBTlAzOdQo6dWP3V8z00udKDxOHu0XeHMxlFvwpkDSDKOvgtmOup2BtR0EAQWHM3JOpJ6k8zUMus0Y5BZG/zAoo+TNQASRQPEJsuvQFvhRxqo4xOEBc8h8TrpUMrqJPGrkZPBh0iiEh8ZLvJzs7OSyj0LMPdTSjoDIqB9Bdb2YgdCdL+Rt61HxElXRee/xI/r31f8OICf1tXLj70zp+GJnsJxUvKFjw0oB9tmUIF99/F00vV1xTEGNL2J00A3NHRuNSRYen5VBxORbL13Gm/u5Voa2ZVdtHnHGeNwyqQ0eId9gmSRQD5nRbed6zvDNHy2spB0/L4E16fxWGPumewBsddL15tggCyEfev/AN2x+tVtlvQ9f/R/i7xuhOqsP/qAfp861t68v/R9iGV2JNwSwPnlYgH4V6iK26aVwryOfqI1M4mmLvT2piVoKCWo41RAEUKo2VQABYdAKkqhOOYMrzssY7wZUJAPi7yOyj2m9uO56hraWqIy7kkAKg/eNh65S30U0JiLE8rjTzFwD7tCKgx+OBCMscrZZF+5k9s93/8ALlvpJyoXAwtH4MjhT4gGMfgJuSFysTk2AXXLawNrAABhoLGTeJYhcF7+LbQbqp/GR01ADHkKNNRTxKwKsLg8vTUEdCDqCNRQBCzZV0QgAAAC2gHQA7DoKfGNOv8AOhXlaL2zmj5PzUf4nUftjl7WxYznQFgQBa5v7NtySeXPX60gIcdGB4wSriwUgXLa+FCtxmBJ2JFrkgrvU0fe6XKKbagBn18muv0qPDDOe8II5Ip0IB+8R+JvkNNCWpQolOovGNgdnbYkjmo5dTryUkAmzMSCNxtyFuYzHVr29NAfMlowIBGxquM9jfMo88wYn1OgA/hF+tTYTEre2YENcixvrubkAAAjXa181MQZXUhrzLC8dxuHafiEkjzYI43EQzRWucPDHKY4poQPui1mUb7+YAPTGNKtRpIGUMpDKwBDDUEEXBB5giqDtxipRhJkw3enEd2ZI+60ZMhDBmYkKq3UjKTdhmADaigZpKjlkCi59OpJ6ADUnyFU3ZXimJxMYmmihjjkjjkiMcrSFhIuY5wyLlIFvj5VbT4aN7Z0ViL2JAJF97E7UCIO6Lnxiy/g6/8AMI3/AHRpve/K3w+1U36koPhaRfSRyB6KxK/KjoMNKB4Zif30Rh8ECH50DD5HCgkkADUk6ADzNBYSdZJXZGV1Col1IYBruzC452ZPlTJoJyVJ7qTLew8UQzaWbZ7kWNvWpeHK/wBoZFylpL2vmuAiJcGw3Kk7CmAS7WF6puK2I1sbHMANdeRq7IoHGRC1hz51Vmi5R2LMTSZ5pxbGWcsenh8yBoB5a7/yq07NcSzp3Ulw4FteY/rX0qu7b8FZGDC7AnMp6fiB+tA4KcOy2Oq6een9GuVUsctzqLhnHY10eCkhZmjZnjaxMbsTkPMxtqVBv7NiNBa2t6fi6zOQsQaG5u0hIZlW+yKVtcjmb/mLnCcVGW0mnnb6is92p4/dGTC6tbxSWICDrru3T/atLkmtiEZNPdGe7e8eEUX6pExaQi0hvfIDyJ5sfzv0vVRDJHEw5Kh9wYfzquiwBJB6m9zqT1YnmdzR8rsn2ci3C7FR4kuNjya3nvUJUqQLqzfdk3VZCoO5v6E6mvTsP7I9PlyrxbsjjFDizX1BudOVvdXsuClVkVlNwRpV+kfNGTVLdMlampTmpEraZBZYwwsb2PQkfMa0JisGiRP3SKpAzgKoF3TxLe2+oFHVUyRoZhE6s91zXclkO9lCeyG8JOw0HPWyGC42UBpSJ1N0OSMuGYNlDq8YvmBLWGU3HhUi2uZhKNL3qBmzHOLQOjG8YTWV7BlsL29OlW/CECwqigAJePQWH2ZKE2HXLehsPogX8BMfuQ2S/quU++gB1NNONNNAEb0A+ANwEfLHe7Ja40Btk/CL2JGoNthc3NkNctICCTB5hZpJCPIqh13syKGHuNFQoFAA2Gg1J09TSCnigCY1FiIRIrIwurAgjqD61KaUUxAPGOJxYSB552KxxgFjYsdwoFhckkkD315p2JwvE8ZgFjUw4XCymdmlZRPNMJpnZ8sZ8CLZini10uN69XmIyknYAn4a1mP0YQsnCsGrAg91ex00Z2YfIigZnP0e8DjwuNxGGmeV8RhwDhnaV8rYKUAALFmy+FhY6WBK22r0oVTcT4AJMZhsYshjeASIwC372KQf2bG4tZvEDrudOYuhQAPgMDHDGIolCIt8qi9luSxC32FybAaDYWFTZabiMQka5nYKt1W7Gwu7BFFzzLMB6kUhxKfjX+IUAdzo/D7VVNi4wfaBPRfEfcq3Jq1w+1AE1NZrVzNUMjU0ISWQ8qouOcRjhQu7eLZVudbnoNb1d0C2GXPmKrc6XsL87a1DJFyVInjkou2U4X9ZVQwKgi9jvr16em9VPFOyJikMsBupAJTUsthqQT7QNr9a2Iyxg6egqOO+bM3PnUPZ4tb8/MsWeSe3LyMbg+ESYjNZxGq6XtmJO9gLjlzvzoriXZ+OPCOkYzEi7MdWZgbkk209OVarD4YLnGUAFywt0IH8qiOHIuALhtCOmm9EMMYxrqOeeUpfA8y4fgFvH5EfE7D61XcewNpTmvl30F7k8vz99bnFdnpMx7sG2/TXn89ffU68DlLByoBtYnMPja+tY3GSldGrii48zLdg+CFps5jKovJt2NuYtttXqGDwqRXMaKt98oAv6gVFhcKI1sN7epPqaKvW7FBRRiyzcmErJenJQxNERtVpUS0tIKWojIoYgtwObFvQsbm3vJPvofEjWjKpOLYi5yANk1WRwLgaezprrsWA8PkdQAEV5txLAyRzxO+InjZ2UYlyixqMilrpihlujuAoRpLKjkBQcttthMQI7JvFoEk+6pOixsx9ror89m8Vi9g1AGbWbEpbLKkwPsiUCN2vtlcBQFG1wshPU0RFx0Kcs0UkZ6hTIp/dCjvMo/EyKKlxHBoTcqvdkkkmImMMTzdF8Mn+cGhf+HzqLJIki6DK47s+dyqtH7hEvrSAuMHjI5RmidHF7EqwYA8wbbHyogGsli4Y75p4HiYXAkUFSq9ElQuIl03LxURwjGuJD9sJYSF7ssysNQxb7QAmwyixLvmudtLgGtNNJprTLYtmGUXJNxYAakk8rCkwmJSRFkjYMjqGVhsysLgjyIpiJBS11dQA1qUULxTHxwRtLKwVVt01JNlVb7sSQAOpqu4Tx9ZZjD9mSI1cmN86qxCt3ZawDHK6sCtwRfbS4BP2nUthpY1KiVo37kHnNGpkjA62KA6cgTypMTKMQsfdSL4kEpTNYmKVGWN2ym+S5JFtyo1Fr0fjMMsiFTcaggj2lZTdWU9QQD9bjSoOF9noo4oIyuY4eJYo3YDPlVVUi42ByC42Nh0oAi4NKSpQhvsm7nMz94ZMir485ALE3sbj2gw5Xq2ecRgZr6+V/jTwqjZRptQnE3uoPQ1OEbdMjN0rRL+uKfvCu79fxD4iqKSShZZKv9mvqZnq66Gm/Wk/GvxFcJEOzA+hFZJpKiMtP2N/mIf7CK5x+ptSgNIyi1Y+Hikiey56a6j4Go14niIpDJJJnXmuwt0A2FVz02ZbRV2W49bglFyk+GjYZjyH5mkIPM/E2+lYTFdrJ39khAb2AGtvU1U4jiUj+07H1J+lXQ7Jyy8cqMGX/IMENscW/oejz4+FPblQe8Xqvn7U4Zdizegt8zavPWkphetcOyMK8TbOfk/yHUS8EUvqbPEdtfwRD1Y3+Qq17OcSedCXtfMdhbTS1ea5q3fYJx3Ln/EI/wC1aNVpcWLFcFRPs3X6jPqayStUzWAU4NYjzpquKhZ9SxNhsP69a5J6QsUa9PoDDz8+VJjsYQQi5xcXZwjOFXyspBc8gdBueQZMZJPKXYxobW9t/wAPPKv7ZHwGvQFksYUBVFgNhSR4yJFCqJAB/hSnzJJy3JJ1JOpoefHqdg//AE3H1WkA6RQQQQCCCCDqCDoQQdxQOYxaMSY9gxNynRXJ3Xo3x6mb9bH4X/hI+tRyYk/3bn+D82oGSSGmqarYndWyhG7s7XK3Q/h0Ykp05jbb2TozURhANRrhY82fu0zH72UZv4rXrgaqMP2ljeWNAj5JJJoY5fDkaSAEyAC+bL4JAGtYmNuWUkEEcZ7NJLE0KuyK7KZN3aRFJYxF2ObKxtm11Fxpc1P2W/Wf1aM4u3fNdnUKqrHmYlYlC/dRbLe5JtvVw1IKkIWo55lRWd2CqoLMxNgABcknpUlZvGY5JvtGa2HjOdTewkZfEJLncC10voLd6dBGSAR42fMe/mU2F1hiI1u3hN05yNmCnpmEYsWkuV2V7PphlZsoEkjO5AtljEjZ2jjtoBfUkbnayqiqvDcGWYYiVbG1oYyLd0liMxU7OQSNdVBI0LPmvMMb69KBk8aW9fpTzJb0oQTza3VAL6DMSffpTI8aScrrl6EHMp8r2BB9RbzoU48huEuYUxoXGLdG9L/Cn3INuXKosZKAtt7gjTlyqTkou2RUHNUigxEoFV02JFZ/iX65E/8AeL5aG37p/nUH/EiRrXa08YZVcJJnm9bPNgdZION8v6i7kxdQtiqpjiqacRWxYUcmWqmy2bFfUfWjOJYod3sPnWbaejcXPdaHiVoI6iSjJPqCK+lIXobvN/65U1pavoz92EF6YXoYy0wy0UWLGF563X6P1XupCd89h/CDXnkBZyQgzEC520HUk16N+jwOkTK1rs+Y21sLAb+6uZ2jnxqHd37223U7fZGiy973vD7qT3NLArX6jrRiDy2pQaULXFs9FQgI6UuYU4A0tvKgCIxKf/2m/qqefxqbKOlIQKQyP9UXqaQ8P/a+VPDWqdGooCvfhZ5MPhTRw1xzFWldelQ7Kv8AUX6D41kUwOI75JYcIqQQK8OGRj3ABJImmMWW6ghVVOdi5Iswr0ItQUs4JtyoaAJEgOlKVHQUNY9fjU0b9adiKDtHilLdy2kXh71rMwYubLEVW5ym4LbZsyrszFWcMwa4hlma/cKbwg2PeMDfvW5MoIBXkSAwuFjYmnhSl5mkYyCVrlGChFXu1jyAAXZSqi4YkG50G1S4jChtwSOlzb4UrGlYTIq/jHvNLHp09xqlk4FAd4/mahPZ+HlmX33qLLFAv5CaaIyeVVGD4LkOZJNfMBvrRww8vOUH/KPyqHAS462C3ja2m/KqHHYCRjrE581K3+oq4ETcyp+IoaThV9nZfSxHzFKePi5/uTx5VH4fIx3FMHiFViHli0sC4U6nQWY5hfyrBN3sZtJ1Nj19fOt52p7CYmdg6zo4QEqrDK1zvqBbkOlZnE9k8cWVHW4toWkj3PIXbU6V1ezo91uppJ80/pucrtVrOnFwba8LXL47FWMXS/rVXD9gscP/AIj8V/I0NJ2Lxw/+Bz6C9dpajG/xL1PPPRT/ACv0ATiaObEXUfuj6ChZezGOG+Gm/wCm38qDxrtERG4KsFW6kWIOUHUGprJF8mVZNJKlsPkxGp9351E2JqsmxF2AGpPIa3pzI49pSvqLfWpqSLlp6VsNOIqfBNG2fvHK2XwgA6nnqKAhwjtsCR1ALfStPwHgGGY/aYt0JFivdd2f4nJB+FZ9W5PE1F0/n/w06WOOGVOSTXx+4nBxDGr933l28JNibgHS+b1NeidloI0iBZrs3iOa118hY6Vn07FoXXuJ3ym1wxzX11YZco25WrdxcJjCgZQbCwuL7eteXnilGdt2z08c8ZQ4YqkTIy9fmalU9GoccNXlp6XFMk4Wfuu6+lj9RTVkNg0X6ilu1VP/AA/Er7Myt5Mlj8Q35UuTFj7qN6MR9RTFRa52qCfE23oB8ZMgJaJ/dY0AOL39pHHqpHzF6TY0i8Et/MVLDJrVRhsSrbG1HxtSTBoswacKhw7XFJipLCw3NSIkGMxHIbUDm/r/AGqUp1pjE8hUGTRFN2hw6aPIq+pArPdov0g4GKyrMjk3JCttblmGxvVDxL9HveMWM0jHzNvpUUf6NC2sjrb9wFj7xpUWsnDbX8jw6nR5MvdR4uLzr3fUuOG/pXwTxhpQ6NexAUsunMMNxVphP0h8Ok2xCD97w/Ws4f0XYdgMzP6cvhUsX6KsGN1JqCczrvTaRJe9+vP+Dc4XjEEnsSo3owNGCxrDw/o1wa7IR6MR9KtsH2Ujj9h5h6Svb4XtU1x9UVTwaVeHI/T7r9jSJGKmCCquLCuu0j+8g/UVMUk5yH3AVNX5GOWK3tJB+UUhIqoxEAt4nk/jI+lqzmL7LmZrxSui/eLO8hJ/ZDHSk5PyJw00Gm5Tr5fc2rYhPxL8RVXj+HJK98zHy8RXa2mlhQPDexsUYGZpHPmxX5LV/BhFQWUWqcW0ZpxgvC7K6HhpRQiu4VQAoDGwA0AHlXHCv/eSfxH+dW+WuyVPjZTSKf8AVZP76T4n+dVfEuyOHxD5517xrWu29hsL3rVmOk7upLJJchOCfMy/D+y0EBJhQxkjKShyki97EjfWqzAdjwkrykByWJUv4iovpob6+dbvu67u6nDU5I3T5lOXTQyVfQpEws1vatTX4fK27A1e5KXLS7+RB6OD2d+pRcM4Y0T5gAdLW29+gq37080Pup5hN9Gt5W0rssg6Gq55HN2zThwRxx4YvYi/X0G4ce4mlXiMX47eun1qQyHmlNJjO6/Kq7RbwskTEqdnU+8VKHPIg0G2BhbkKjPCF+6xHoSKZEJxczWtYfGg2ntvl+Ips3D1Htu38Rqvm/V12Uufj8zUJE4q+QYcfFfUp8RRkRUi6/KstjOKIo1SFB+2w+lVS9p0Q3j8Z6QxSMD7wLVDjRfHTZJLZHo2HexpkrXN6wXEu0vEJYbYPBSLKTbPLZQo6hTufWrHh2K4o0NpcPEsthZu9up8yAunzp8YvZ5J7teqNJLKBQUuJFUD8F4jJ/aTQr5AO35qKVOxTn28S3+VEH/2uaVyfQl3WNc5r5JmudbfdNQPJb7jfCrG9LV1mDu0uRTvj1G6P/Cx/KoW43GN1f8A6b/yq+IpjKOlFicH/UZs46SVrRKyr1KkfWguOcIx9gcLiCDzz2t7tK2KipKjNOSq6IYdPHHPj5v9XXoec4bCcfXeXDOP2lP/AI2q2w8nFx7cWGb0d1/I1saUUV8Tes9fhXoZ/DtjH8MsMag7lXLH3DKKvMNAFUAVKKdTSI5MvFtVL4DbUlLSVIpOrq6uoA6utXV1ACWrrUtdQAldXV1ACin2pgp4oA61IVHSnV1IZC0C9KYcP0JFEGkpUNSZWz8Mze0xqE8AhPtAt6sfpVuaSlwomss1ydFZDwPDr7MSD/KKLTDKNgB6CiKSnSIuTfNkfdVxSpRTWooVkRWktTmpppAf/9k="
            alt=""
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* Tiêu đề */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Mục Tiêu của chúng tôi
            </h2>
            <p className="text-gray-600">
              Tự động lưu và phân loại tài liệu theo nguồn, hỗ trợ trích dẫn
              nhanh - chuẩn - chính xác.
            </p>
          </div>

          {/* Các box */}
          <div className="flex flex-wrap justify-center gap-6">
            {/* Box 1 */}
            <div className="flex items-center gap-3 bg-blue-200 rounded-2xl px-6 py-4 shadow-md">
              <div className="bg-gray-100 p-2 rounded-md">
                <FiBookOpen className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-bold">+10</p>
                <p className="text-blue-900">Cách trích dẫn</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="flex items-center gap-3 bg-blue-300 rounded-2xl px-6 py-4 shadow-md">
              <div className="bg-gray-100 p-2 rounded-md">
                <FiPlus className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-bold">+10</p>
                <p className="text-blue-900">Nguồn trích dẫn uy tín</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="flex items-center gap-3 bg-blue-200 rounded-2xl px-6 py-4 shadow-md">
              <div className="bg-gray-100 p-2 rounded-md">
                <FiLayers className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-bold">+2</p>
                <p className="text-blue-900">Tự động phân loại tài liệu</p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="flex items-center gap-3 bg-blue-400 rounded-2xl px-6 py-4 shadow-md">
              <div className="bg-gray-100 p-2 rounded-md">
                <FiDatabase className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-bold">+2GB</p>
                <p className="text-blue-900">Bộ nhớ lưu trữ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          {/* Tiêu đề */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Tính năng nổi bật của chúng tôi là gì?
            </h2>
            <p className="text-gray-600">
              Khả năng lưu trữ tự động đặc biệt ra sao?
            </p>
          </div>

          {/* Grid 3 box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Box 1 */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AiOutlineClockCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Tiết kiệm thời gian thao tác
              </h3>
              <p className="text-gray-600">
                Hệ thống tự động xác nhận và phân loại tài liệu ngay khi người
                dùng tải lên, giúp giảm thao tác thủ công, tránh bỏ sót tài
                liệu.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AiOutlineFileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Tổ chức tài liệu thông minh
              </h3>
              <p className="text-gray-600">
                Tài liệu được lưu vào đúng thư mục theo loại nguồn (PDF,
                Website, Word...), đảm bảo người dùng luôn tìm lại nhanh chóng
                và chính xác.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AiOutlineUser className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Tăng trải nghiệm cá nhân hóa
              </h3>
              <p className="text-gray-600">
                Giao diện song ngữ (Anh – Việt) và chức năng lưu theo lệnh cá
                nhân cho phép người dùng kiểm soát tối đa việc lưu – xoá – phân
                loại tài liệu.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50">
              Về chúng tôi
            </button>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-md hover:opacity-90">
              Bắt đầu ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
