
import mongoose from 'mongoose';

const genData = function(){
  return [{
      '_id': new mongoose.Types.ObjectId('59073316e0450550d1171923'),
      'arxivId' : '1612.04357',
      '__v' : 0,
      'createdAt' : new Date('2017-05-01T13:07:30.842+0000'),
      'categories' : [
          'arxiv.cs.CV',
          'arxiv.cs.LG',
          'arxiv.cs.NE',
          'arxiv.stat.ML'
      ],
      'authors' : [
          'Xun Huang',
          'Yixuan Li',
          'Omid Poursaeed',
          'John Hopcroft',
          'Serge Belongie'
      ],
      'summary' : 'In this paper,we propose a novel generative model named Stacked Generative Adversarial Networks (SGAN),which is trained to invert the hierarchical representations of a bottom-up discriminative network. Our model consists of a top-down stack of GANs,each learned to generate lower-level representations conditioned on higher-level representations. A representation discriminator is introduced at each feature hierarchy to encourage the representation manifold of the generator to align with that of the bottom-up discriminative network,leveraging the powerful discriminative representations to guide the generative model. In addition,we introduce a conditional loss that encourages the use of conditional information from the layer above,and a novel entropy loss that maximizes a variational lower bound on the conditional entropy of generator outputs. We first train each stack independently,and then train the whole model end-to-end. Unlike the original GAN that uses a single noise vector to represent all the variations,our SGAN decomposes variations into multiple levels and gradually resolves uncertainties in the top-down generative process. Based on visual inspection,Inception scores and visual Turing test,we demonstrate that SGAN is able to generate images of much higher quality than GANs without stacking.',
      'updated' : new Date('2017-04-12T15:04:01.000+0000'),
      'published' : new Date('2016-12-13T20:48:58.000+0000'),
      'title' : 'Stacked Generative Adversarial Networks',
      'pdf' : 'https://arxiv.org/pdf/1612.04357',
      'abs' : 'https://arxiv.org/abs/1612.04357',
      'ver' : 4,
      'updatedAt' : new Date('2017-05-01T13:07:30.842+0000')
  },{
      '_id' : new mongoose.Types.ObjectId('59073317e0450550d1171935'),
      'arxivId' : '1704.04865',
      '__v' : 0,
      'createdAt' : new Date('2017-05-01T13:07:30.859+0000'),
      'categories' : [
          'arxiv.cs.CV',
          'arxiv.cs.LG'
      ],
      'authors' : [
          'Felix Juefei-Xu',
          'Vishnu Naresh Boddeti',
          'Marios Savvides'
      ],
      'summary' : 'Traditional generative adversarial networks (GAN) and many of its variants are trained by minimizing the KL or JS-divergence loss that measures how close the generated data distribution is from the true data distribution. A recent advance called the WGAN based on Wasserstein distance can improve on the KL and JS-divergence based GANs,and alleviate the gradient vanishing,instability,and mode collapse issues that are common in the GAN training. In this work,we aim at improving on the WGAN by first generalizing its discriminator loss to a margin-based one,which leads to a better discriminator,and in turn a better generator,and then carrying out a progressive training paradigm involving multiple GANs to contribute to the maximum margin ranking loss so that the GAN at later stages will improve upon early stages. We call this method Gang of GANs (GoGAN). We have shown theoretically that the proposed GoGAN can reduce the gap between the true data distribution and the generated data distribution by at least half in an optimally trained WGAN. We have also proposed a new way of measuring GAN quality which is based on image completion tasks. We have evaluated our method on four visual datasets: CelebA,LSUN Bedroom,CIFAR-10,and 50K-SSFF,and have seen both visual and quantitative improvement over baseline WGAN.',
      'updated' : new Date('2017-04-17T04:42:56.000+0000'),
      'published' : new Date('2017-04-17T04:42:56.000+0000'),
      'title' : 'Gang of GANs: Generative Adversarial Networks with Maximum Margin\n  Ranking',
      'pdf' : 'https://arxiv.org/pdf/1704.04865',
      'abs' : 'https://arxiv.org/abs/1704.04865',
      'ver' : 1,
      'updatedAt' : new Date('2017-05-01T13:07:30.859+0000')
  }];
};

export {
  genData
};
