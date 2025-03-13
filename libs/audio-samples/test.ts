let strings9 = hex`524946467406000057415645666d74201000000001000100602200006022000001000800646174615006000092a8515977939aae6a4a708998a98e47678297a29d4a5b78939bad7349738a9aa97a426b7d999fa95a587e92a0a4584f73899ba8934b6a8697a78b416277949cae7a4d788d9ca763446f809ba0aa5f5a8391a5944657748b9ca89a516c8b96a8723e6876979caf7f4f7d8ca19d4f4c6f819ca0ad675c8991a87e3f5e728d9da99d55708c99a459436978989caf8554828ca58b42546e849ca1af6f5f8c91a7643f61738f9da8a45b738e9e96464d687b969faf9158868da7713d5b6d859ca2b374638c94a04d4862768f9fa8ab62778da2813c55687f96a0b1965c878fa55c415d70869da1b67e688c9990404f61778ea0a9b0687a8ea16b3c5a667f97a0b39e6287949847495e71869da2ba856c8c9c7b3958607b8ea1aab77079929a54415d6a8196a1b5a7698698873b515d73869ea4be8c6e8e9b623a5c617c8da2abbc7978958d42495c6b8196a3b8ab6e859b7036585d76859ea7c2976f91924b415c637d8da2afc181779b7838525c6e8197a5bbb4738698553b5b5f77869faac4a06f96833c495c667c8da4b1c788769c6038565e6f8198a8bebd74888d40445a627788a0acc8a86e996a35515c697c8fa6b4cd8f7a95473f5760708297aac0c5768c7b354c5a667787a0b0cdb16f955137555d6a7d8fa8b8d3927c88364657636f8397b0c3cd7b8b6531525b677688a2b4d1b4738e3e3f56606b7d8eabb9da967f742d4e5666708498b3c7d380874c34565c697588a5b7d6ba797c2f4655636b7e8eafbede9b7f5a2c5456686f849ab6ccd4857c393c555e6a778aa6badabd7e63294d55666c7f90b2c3e0a278423156596a70859cb9cfd790652c4455626b778aaabfddc27d4a2b5156696b7f92b5c8e0ad68313a555d6a7184a0bdd4d9924c2a4a55646b788cacc5dccb7633345159686c7e95b7cde0b5532941545f6a7286a1c2d5df9334304b58646c778eadc9dcd368243c515d686e7f99bcd1e1b73b294655616a7289a3c7d5e58d1f384c5b656d7892b1cedbd8511e435060686e809cbfd2e5b7262e4757636b738ba7ccd5e97c143f4b5e656e7996b4d2dcdc3e1f4750626970839ec4d2e9ac1436475a626d738fa9cfd5ed690f454b61656f7a98b8d3ded52b244954636a7187a1c8d2ed9a0b3d485d636e7592aed3d6ea5613494c6266707d9bbdd2e3c51f2c4855636b738aa5cbd4ec860e41495e646e7794b1d2dbdf441a484f636772809ec0d4e6b11e314858636c748ca9ccd7e47415414b60656f7a98b7d1e0cb4023475263677384a3c2d5e39b24344a5a646c778eafcadcd56820404e60666f7e9abad1e1b24327475563697586a7c3dada892d334c59666c7b91b3cae0c064293e525f6772819dbad4dd9d492a485464697889acc1dfc77d3c305059686d7e95b6c9e2a7672f3d5360687583a4bbd8d089582a4b55646a7c8db0c0e1af78442f535968708399b8ccda8e71333e5560697888a7badcbb7e632a4d55656b7f91b3c2e0967f4c30555a6972869eb6d0cb7e7d354056606a7a8baabadca27c6e2a4f56666e8395b2c5d580885232565a697689a2b6d3b37488364255616c7f91acbdd78d81752d50576772869ab1c8c374905534555a6a798ea5b8d19c768f3b4257616f8197abc2c8798979314e58667489a0b1ccac6f985a35545c6c7b92a5bbc9877d924142586173849cabc5b571917c354d5968788ea2b3c892739b6037555c707f98a6beba77849547415a627788a0abc69c7095823a4d5b6b7d93a3b6bd7d7c9d6737575d73839ea4c3a1708b964f3f5b637b8ca1aec1817698863c4d5c6e7f99a1bbab6f849c6f37575e7787a0a5c188728f99543e5c667e91a1b1b26f7f968d3e4c5d70849da3bc926b8b9b7538575f7a8ca1a9b87179909d573e5c688197a2b49e65889595424b5e74889ea4b8786f8e9c7b3957637d91a2ada8628190a25e3f5d6b849ba2b585648d9598444c60768e9fa9af67768e9f803a57658096a1b0915c8890a4603f5e6e8b9ca6b070688f979d484a6479949ead9a597e8ea2853d576a8499a2b0795d8d90a7663e62718f9caaa25d6f8f99a04d4a697c989eaf8255848fa5883f586e8a9ba6a762638d91a86c3f6475959bae8b53778e9ca04f4a6c7f9aa1ac68598591a58e415a708e9aab96516c8d95a971406878989cb071527c909da4564c6f859aa4a254618593a590435e74929aae7f4b738b99aa77406a7c9aa0a95c577e919fa55b4d74889ca88f466a8498a496465f7b93997c837d827e837e817e817f`

music.setVolume(100)

while(1)
{
basic.pause(2000)

samples.setSampleRate(0,11000)
samples.playAsync(0, strings9)
samples.setSampleRate(1,11000);
samples.playAsync(1, strings9)
samples.setSampleRate(2,6000);
samples.playAsync(2, strings9)
samples.setSampleRate(3,13000);
samples.playAsync(3, strings9)
}
