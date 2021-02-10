import { Shape, Weapon } from "./types";
import chunk from "../assets/chunk.svg";
import circle from "../assets/shapes/circle.svg";
import triangle from "../assets/shapes/triangle.png";
import square from "../assets/shapes/square.svg";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  chunk,
  shapes: {
    [Shape.circle]: circle,
    [Shape.triangle]: triangle,
    [Shape.square]: square,
  },
  weapons: {
    [Weapon.uzi]: `data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAkCAYAAADy19hsAAACRUlEQVRYhc2Xv2sUQRTHP4lnNFFMbGwuaayCwSgkNoKi/4HYWAdTmxQptAh2aidBsLYRERsbCxWsxB+FqCiikIAhaUxhxIBiiHfy5I08Jzuzt+zd7Xxh2Jndt7ufnf3O27c9pKEh4KghWQUWE2HL1DzQNO1TKLBm+qeBG0BvRtxjYKaDwDu88Z5QoAU+AoyZsTxpKpb5p6zZdGp2HydfMoNzwGWgT1tD9/eYvuhHBznkvju9+30HTgFvbKBYYlg94wLtrNt+0FdtlL3fIHAR+Gj2PXAeTtKvwDlvPOKeKOblVLQl2cSBJrnAPP1Nfalb4ivwU/uyIJ/Wck6oWueB+5YhdQ9flVkFHgH7UEu8qp4rqFFz4KDNybfVI80Ot98lrm+rOfZqOVfmgq20d8C1AvFb2qQ/7r+Gw8CvLgBTAPoJcAu4DuzK8s3LLgGLruTEyts+lmfyjcgFpvTP4LiOH+pY2rq+HelfahEYrU+GAq0/D7ae88TWQwL3RfsH9PhrHc8WAC4s++E4FDm54VVN08Bb7V/Q7b2yMK3IAo9F4jeBu96+s7o9qdubVQA3M2oKmd3dwJnIdZaBbx1i/E8WeCJQAMlne0FTS0gr3YClgIdf6CxWLlf01EOJWfUhBVgM8EQkxs8QlcoBT0YgPmuWSAq4rjPpq2HybRJywOOBIl72vU8ROJYhkllwKLDYYSAS007g0muhVrCGaEV3tOjO+sF9VhaYnOpqqR03aKecJUJK7gdVaof9wImMLCEz/BxYq4htu4A/EiQHobgPORQAAAAASUVORK5CYII=`,
    [Weapon.sniper]: `data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAbCAYAAAAj4uLUAAABo0lEQVRYhe2Zu0oDQRSGP2+NgiCI2ETFXtFKQTAWVilEBEshYGcViC9gZSX4AIL2voEoiIVEixRCOpFVW1svqKgMO8KwzG6Szclmw+wHA8nszDlnfuZydraHzjMMbAEDgUiqwFUS0fUL2VEDWQvYuwdugc86fXeAfUv9GzAkFF8kZtBqIHmgz6j7Aa6Blzp29oCSpf5d978EasCvpc1ciM1BYN1S/wpc6NjEOdZBBstZA45OQvq2q2xLDr7X+D0S0mZM0qEQOUljpgjO4rwI/xwlvJ6lyhdQlBBAzYRVESmTR51sKxJenV8OZCL4qLTZAybTEEwMnnV6HRe1t5yqdfXRTaMOkBPIGWbUTFgCNgLpclzmgWWJ0SXIo7SrUhcetZ7zGyPZ6eDjvAhkIvhIi1DVN0IZBlMN7M6Hunkxoo15+zQBlIGKy6fDE3AALOpMdxe4acVgt+8J4oK0g1H93h81HcvabyHkueo/3mRszSwZL4nvDrPAdMgz9d5yDnzr/3nLXecDcNeCfyXIpi4LlufiaXPasc2QWhq+QHUKJUgBqPwB2g3ojchTvTIAAAAASUVORK5CYII=`,
    [Weapon.shotgun]: `data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAfCAYAAABZGLWTAAAB3UlEQVRYhe2Yu0sDQRDGf9H4QEVRUmgRCIgRO22sUvgPBC0stLHWQgR7QbCzsNEiaioLsVSwsRAUBEEsRC0iIiKIiE3ESo0vFja6OfPYi7nkNvGDhdze7O18zHw7s/HwgyZgDWjjN96AaeA0zTsj0Qt8ZhkzphOssmFb7aAfRYEdssZDaLYBOAb8UreZ8AI8G0C4DngCpoAN68tADq2aPCJAfaWQFeMM6EKmsSB7Xcw8KwFEWvsr5YBqFv2DF7gFtmSEBVqU32WPoTLVbqCS6uxHOrLvJXDEaawLuXrSbCLEPCe1q6If6PmjU1fAgfIcAjodJPoqm4uI3YULBdBN1PLNqIMavZSXm294bZBdBBKyHcsHYu2qZd08EAdqgDGgFYgBO4rNBFAL3ACbsp+f1Nh/FzjJ01fHsS0jcqRsNKpEKqjMn2tENuZWogKz0skHZe5Ozh1abJc0U7m9yBy0EZIOJpQFYXmoBS0fGdYkO6IuSncalwpVStm7z+GDOGt8Gn4uA+Mu4piCeIFP5BTduimyyJob1rQdBAY07Do0MsX1sK1bk3vjfU07negbAVv11vRbz56GTXey3lYCWZKpbDrZf91m0m05/FOhq1ufnSueW7EC9AGNWRy8AB6/AIXSXCURUlkLAAAAAElFTkSuQmCC`,
    [Weapon.handgun]: `data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAfCAYAAACh+E5kAAAB4ElEQVRYhdWYyysFURzHP4Y8spFioYhiIaVbLNhdKSuUHTYka8lf4N+wtLW+LJQFkQ3JChvlsaAs5P28Vz/9pk7TGHfmzr33zLd+NXPmPH7f3+P8zpkK7EMNUOfR6k3FerQAL0DOI+9Am5/yjvE8C3SWmWGzj/UF1UBj0MBWZSxuWvQQKyVSPtZ3JRWkR7un8y7QFaPiQ8AFcP2P3Or6WeBbJatt8u0SmDEnrtC4GwVWPItK3C0DpzEQGAPmYphHiOwAabNxLcBtNooYttZV3tEEycVgnVJB9B0wCSQR6SQTyPkRsLEi/wXRddDNA0e3p6RB8mDS1VlI9CZsJ5LacA5UOfrykDAPSBh1APNuDryWaSstdM1hM3l7gKYCJxTUAxngBpgy2lf1RPms8TsRoTovAUfG+3EM+vriyxOW+2rtJz04CsYjxP6Cd7Fi1YFH9YQJsXw3cKVthxHm7Y9PxWCcqsVajV4NPiMeQnrgpFQEMrqghNJngGRDEvj2eraySAQkXEZU8Y8AkU2kKsS80n/DCMOyY7rQRC73YW47wpiSJXK+uLc1kfPFXiGJbMN9YCtkf8f8Q2EDgYMIY/rcBxsIWF2R88VdyDw4s43AeoQLzW8i23Kp3wzZX34A1wD8AG2LIlqAq6PoAAAAAElFTkSuQmCC`,
  },
};
